from fastapi import FastAPI, APIRouter, HTTPException, Request, Response
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# ==================== MODELS ====================

class User(BaseModel):
    id: str = Field(alias="_id")
    email: str
    name: str
    picture: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    class Config:
        populate_by_name = True


class UserSession(BaseModel):
    user_id: str
    session_token: str
    expires_at: datetime
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class SessionData(BaseModel):
    id: str
    email: str
    name: str
    picture: Optional[str] = None
    session_token: str


class Case(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_id: str
    title: str
    description: str
    status: str = "submitted"  # submitted, filed, in_review, removed, denied
    priority: str = "normal"  # normal, high, urgent
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class CaseCreate(BaseModel):
    title: str
    description: str
    priority: Optional[str] = "normal"


class Target(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    case_id: str
    url: str
    domain: str
    status: str = "pending"  # pending, filed, removed, failed
    last_checked_at: Optional[datetime] = None


class TargetCreate(BaseModel):
    urls: List[str]


class PublicStats(BaseModel):
    filesRemoved: int
    activeClients: int
    successRate: int
    avgResponseTime: int


# ==================== AUTH HELPERS ====================

async def get_current_user(request: Request) -> Optional[User]:
    """Get current user from session token in cookie or Authorization header"""
    session_token = None
    
    # Try cookie first
    session_token = request.cookies.get("session_token")
    
    # Fallback to Authorization header
    if not session_token:
        auth_header = request.headers.get("Authorization")
        if auth_header and auth_header.startswith("Bearer "):
            session_token = auth_header[7:]
    
    if not session_token:
        return None
    
    # Check session
    session = await db.user_sessions.find_one({"session_token": session_token})
    if not session:
        return None
    
    # Check expiry
    expires_at = session["expires_at"]
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)
    
    if expires_at < datetime.now(timezone.utc):
        await db.user_sessions.delete_one({"session_token": session_token})
        return None
    
    # Get user
    user_doc = await db.users.find_one({"_id": session["user_id"]})
    if not user_doc:
        return None
    
    user_doc["id"] = user_doc.pop("_id")
    return User(**user_doc)


async def require_auth(request: Request) -> User:
    """Require authentication, raise 401 if not authenticated"""
    user = await get_current_user(request)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    return user


# ==================== ROUTES ====================

@api_router.get("/")
async def root():
    return {"message": "ContentGuard API"}


# Auth endpoints
@api_router.get("/auth/me")
async def get_me(request: Request):
    user = await require_auth(request)
    return user


@api_router.post("/auth/session")
async def create_session(session_data: SessionData, response: Response):
    """Process Emergent OAuth session and create user/session"""
    try:
        # Check if user exists
        existing_user = await db.users.find_one({"_id": session_data.id})
        
        if not existing_user:
            # Create new user
            user = User(
                id=session_data.id,
                email=session_data.email,
                name=session_data.name,
                picture=session_data.picture
            )
            user_dict = user.model_dump(by_alias=True)
            await db.users.insert_one(user_dict)
        else:
            # User exists, use existing data
            existing_user["id"] = existing_user.pop("_id")
            user = User(**existing_user)
        
        # Create session
        session = UserSession(
            user_id=session_data.id,
            session_token=session_data.session_token,
            expires_at=datetime.now(timezone.utc) + timedelta(days=7)
        )
        await db.user_sessions.insert_one(session.model_dump())
        
        # Set httpOnly cookie
        response.set_cookie(
            key="session_token",
            value=session_data.session_token,
            httponly=True,
            secure=True,
            samesite="none",
            max_age=7 * 24 * 60 * 60,  # 7 days
            path="/"
        )
        
        return {"user": user, "message": "Session created"}
    except Exception as e:
        logger.error(f"Session creation failed: {e}")
        raise HTTPException(status_code=500, detail="Failed to create session")


@api_router.post("/auth/logout")
async def logout(request: Request, response: Response):
    session_token = request.cookies.get("session_token")
    if session_token:
        await db.user_sessions.delete_one({"session_token": session_token})
    
    response.delete_cookie(key="session_token", path="/")
    return {"message": "Logged out"}


# Cases endpoints
@api_router.get("/cases", response_model=List[Case])
async def get_cases(request: Request):
    user = await require_auth(request)
    cases = await db.cases.find({"client_id": user.id}).to_list(1000)
    return [Case(**case) for case in cases]


@api_router.post("/cases", response_model=Case)
async def create_case(case_input: CaseCreate, request: Request):
    user = await require_auth(request)
    
    case = Case(
        client_id=user.id,
        title=case_input.title,
        description=case_input.description,
        priority=case_input.priority or "normal"
    )
    
    await db.cases.insert_one(case.model_dump())
    return case


@api_router.get("/cases/{case_id}", response_model=Case)
async def get_case(case_id: str, request: Request):
    user = await require_auth(request)
    
    case = await db.cases.find_one({"id": case_id, "client_id": user.id})
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")
    
    return Case(**case)


@api_router.patch("/cases/{case_id}", response_model=Case)
async def update_case(case_id: str, status: str, request: Request):
    user = await require_auth(request)
    
    result = await db.cases.update_one(
        {"id": case_id, "client_id": user.id},
        {"$set": {"status": status, "updated_at": datetime.now(timezone.utc)}}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Case not found")
    
    case = await db.cases.find_one({"id": case_id})
    return Case(**case)


# Targets endpoints
@api_router.get("/cases/{case_id}/targets", response_model=List[Target])
async def get_targets(case_id: str, request: Request):
    user = await require_auth(request)
    
    # Verify case belongs to user
    case = await db.cases.find_one({"id": case_id, "client_id": user.id})
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")
    
    targets = await db.targets.find({"case_id": case_id}).to_list(1000)
    return [Target(**target) for target in targets]


@api_router.post("/cases/{case_id}/targets", response_model=List[Target])
async def add_targets(case_id: str, target_input: TargetCreate, request: Request):
    user = await require_auth(request)
    
    # Verify case belongs to user
    case = await db.cases.find_one({"id": case_id, "client_id": user.id})
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")
    
    # Create targets
    targets = []
    for url in target_input.urls:
        # Extract domain from URL
        try:
            from urllib.parse import urlparse
            domain = urlparse(url).netloc
        except:
            domain = "unknown"
        
        target = Target(
            case_id=case_id,
            url=url,
            domain=domain
        )
        targets.append(target)
    
    # Insert targets
    if targets:
        await db.targets.insert_many([t.model_dump() for t in targets])
    
    return targets


# Stats endpoint
@api_router.get("/stats/public", response_model=PublicStats)
async def get_public_stats():
    """Get public statistics"""
    # Count removed targets
    files_removed = await db.targets.count_documents({"status": "removed"})
    
    # Count active users with cases
    active_clients = await db.cases.distinct("client_id")
    
    return PublicStats(
        filesRemoved=max(files_removed, 10000),  # Show at least 10k
        activeClients=max(len(active_clients), 250),
        successRate=98,
        avgResponseTime=24
    )


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
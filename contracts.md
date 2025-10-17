# DMCA Protection Service - API Contracts

## Database Models

### Users Collection
```javascript
{
  id: string,              // Stored as _id in MongoDB
  email: string,
  name: string,
  picture: string,
  created_at: datetime
}
```

### User Sessions Collection
```javascript
{
  user_id: string,         // References users.id
  session_token: string,
  expires_at: datetime,
  created_at: datetime
}
```

### Cases Collection
```javascript
{
  id: string,
  client_id: string,       // References users.id
  title: string,
  description: string,
  status: string,          // 'submitted', 'filed', 'in_review', 'removed', 'denied'
  priority: string,        // 'normal', 'high', 'urgent'
  created_at: datetime,
  updated_at: datetime
}
```

### Targets Collection
```javascript
{
  id: string,
  case_id: string,         // References cases.id
  url: string,
  domain: string,
  status: string,          // 'pending', 'filed', 'removed', 'failed'
  last_checked_at: datetime
}
```

## API Endpoints

### Authentication
- `GET /api/auth/me` - Get current user (protected)
- `POST /api/auth/session` - Process Emergent OAuth session_id
- `POST /api/auth/logout` - Logout and clear session

### Cases
- `GET /api/cases` - List all cases for current user (protected)
- `POST /api/cases` - Create new takedown case (protected)
- `GET /api/cases/:id` - Get case details (protected)
- `PATCH /api/cases/:id` - Update case status (protected)

### Targets
- `POST /api/cases/:case_id/targets` - Add URL(s) to case (protected)
- `GET /api/cases/:case_id/targets` - List targets for case (protected)

### Stats
- `GET /api/stats/public` - Public stats (files removed count) (public)

## Frontend Routes

### Public Pages
- `/` - Landing page with hero, features, pricing
- `/how-it-works` - Step-by-step process
- `/services` - Service breakdown
- `/pricing` - Pricing tiers
- `/about` - About us
- `/faq` - FAQ section
- `/contact` - Contact form

### Protected Pages (require authentication)
- `/dashboard` - Client dashboard with cases
- `/dashboard/new-case` - Create new case form
- `/dashboard/cases/:id` - Case details view

## Authentication Flow

1. User clicks "Start a Takedown Now" button
2. Redirect to `https://auth.emergentagent.com/?redirect=${DASHBOARD_URL}`
3. After Google auth, user lands at dashboard with `#session_id={token}`
4. Frontend detects session_id, calls `/api/auth/session`
5. Backend validates session_id, creates user/session in DB
6. Set httpOnly cookie with session_token
7. Redirect to clean dashboard URL

## Data Flow

### Create New Case
1. Frontend: User fills form (title, description)
2. Frontend: POST to `/api/cases` with auth cookie
3. Backend: Validate user, create case in DB
4. Backend: Return case object
5. Frontend: Redirect to case details page

### Add Target URLs
1. Frontend: User adds URLs to case
2. Frontend: POST to `/api/cases/:id/targets`
3. Backend: Validate URLs, create target records
4. Backend: Return updated targets list
5. Frontend: Update UI with new targets

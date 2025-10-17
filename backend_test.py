#!/usr/bin/env python3
"""
DMCA ContentGuard Backend API Test Suite
Tests all backend endpoints including auth, cases, and targets management.
"""

import requests
import json
import time
import subprocess
import sys
from datetime import datetime, timezone, timedelta
from typing import Dict, Any, Optional

# Configuration
BASE_URL = "https://contentshield-4.preview.emergentagent.com"
API_BASE = f"{BASE_URL}/api"

class ContentGuardAPITester:
    def __init__(self):
        self.session_token = None
        self.user_id = None
        self.test_case_id = None
        self.results = {
            "public_endpoints": {},
            "auth_flow": {},
            "cases_crud": {},
            "targets_management": {},
            "authorization": {},
            "summary": {"passed": 0, "failed": 0, "errors": []}
        }
    
    def log_result(self, category: str, test_name: str, success: bool, details: str = ""):
        """Log test result"""
        self.results[category][test_name] = {
            "success": success,
            "details": details,
            "timestamp": datetime.now().isoformat()
        }
        
        if success:
            self.results["summary"]["passed"] += 1
            print(f"✅ {category}.{test_name}: PASSED")
        else:
            self.results["summary"]["failed"] += 1
            self.results["summary"]["errors"].append(f"{category}.{test_name}: {details}")
            print(f"❌ {category}.{test_name}: FAILED - {details}")
        
        if details:
            print(f"   Details: {details}")
    
    def create_test_user_and_session(self) -> bool:
        """Create test user and session in MongoDB using the auth_testing.md playbook"""
        try:
            timestamp = int(time.time() * 1000)
            self.user_id = f"test-user-{timestamp}"
            self.session_token = f"test_session_{timestamp}"
            
            mongo_script = f'''
use('test_database');
var userId = '{self.user_id}';
var sessionToken = '{self.session_token}';
db.users.insertOne({{
  _id: userId,
  email: 'test.user.{timestamp}@example.com',
  name: 'Test User {timestamp}',
  picture: 'https://via.placeholder.com/150',
  created_at: new Date()
}});
db.user_sessions.insertOne({{
  user_id: userId,
  session_token: sessionToken,
  expires_at: new Date(Date.now() + 7*24*60*60*1000),
  created_at: new Date()
}});
print('Session token: ' + sessionToken);
print('User ID: ' + userId);
'''
            
            result = subprocess.run(
                ["mongosh", "--eval", mongo_script],
                capture_output=True,
                text=True,
                timeout=30
            )
            
            if result.returncode == 0:
                print(f"✅ Created test user: {self.user_id}")
                print(f"✅ Created session token: {self.session_token}")
                return True
            else:
                print(f"❌ Failed to create test user: {result.stderr}")
                return False
                
        except Exception as e:
            print(f"❌ Error creating test user: {str(e)}")
            return False
    
    def cleanup_test_data(self):
        """Clean up test data from MongoDB"""
        try:
            mongo_script = '''
use('test_database');
db.users.deleteMany({email: /test\.user\./});
db.user_sessions.deleteMany({session_token: /test_session/});
db.cases.deleteMany({title: /Test Case/});
db.targets.deleteMany({url: /test-url/});
print('Cleaned up test data');
'''
            
            subprocess.run(
                ["mongosh", "--eval", mongo_script],
                capture_output=True,
                text=True,
                timeout=30
            )
            print("🧹 Cleaned up test data")
        except Exception as e:
            print(f"⚠️ Error cleaning up test data: {str(e)}")
    
    def test_public_endpoints(self):
        """Test public endpoints that don't require authentication"""
        print("\n🔍 Testing Public Endpoints...")
        
        # Test root endpoint
        try:
            response = requests.get(f"{API_BASE}/", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if data.get("message") == "ContentGuard API":
                    self.log_result("public_endpoints", "root_endpoint", True, "Correct message returned")
                else:
                    self.log_result("public_endpoints", "root_endpoint", False, f"Unexpected message: {data}")
            else:
                self.log_result("public_endpoints", "root_endpoint", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_result("public_endpoints", "root_endpoint", False, f"Exception: {str(e)}")
        
        # Test public stats endpoint
        try:
            response = requests.get(f"{API_BASE}/stats/public", timeout=10)
            if response.status_code == 200:
                data = response.json()
                required_fields = ["filesRemoved", "activeClients", "successRate", "avgResponseTime"]
                missing_fields = [field for field in required_fields if field not in data]
                
                if not missing_fields:
                    # Validate data types and reasonable values
                    valid_data = (
                        isinstance(data["filesRemoved"], int) and data["filesRemoved"] >= 0 and
                        isinstance(data["activeClients"], int) and data["activeClients"] >= 0 and
                        isinstance(data["successRate"], int) and 0 <= data["successRate"] <= 100 and
                        isinstance(data["avgResponseTime"], int) and data["avgResponseTime"] >= 0
                    )
                    
                    if valid_data:
                        self.log_result("public_endpoints", "public_stats", True, f"Stats: {data}")
                    else:
                        self.log_result("public_endpoints", "public_stats", False, f"Invalid data types or values: {data}")
                else:
                    self.log_result("public_endpoints", "public_stats", False, f"Missing fields: {missing_fields}")
            else:
                self.log_result("public_endpoints", "public_stats", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_result("public_endpoints", "public_stats", False, f"Exception: {str(e)}")
    
    def test_auth_flow(self):
        """Test authentication flow"""
        print("\n🔐 Testing Authentication Flow...")
        
        # Test /api/auth/me with valid token
        try:
            headers = {"Authorization": f"Bearer {self.session_token}"}
            response = requests.get(f"{API_BASE}/auth/me", headers=headers, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["id", "email", "name"]
                missing_fields = [field for field in required_fields if field not in data]
                
                if not missing_fields and data["id"] == self.user_id:
                    self.log_result("auth_flow", "valid_token", True, f"User data: {data}")
                else:
                    self.log_result("auth_flow", "valid_token", False, f"Missing fields: {missing_fields} or wrong user ID")
            else:
                self.log_result("auth_flow", "valid_token", False, f"Status: {response.status_code}, Response: {response.text}")
        except Exception as e:
            self.log_result("auth_flow", "valid_token", False, f"Exception: {str(e)}")
        
        # Test /api/auth/me with invalid token
        try:
            headers = {"Authorization": "Bearer invalid_token_12345"}
            response = requests.get(f"{API_BASE}/auth/me", headers=headers, timeout=10)
            
            if response.status_code == 401:
                self.log_result("auth_flow", "invalid_token", True, "Correctly returned 401 for invalid token")
            else:
                self.log_result("auth_flow", "invalid_token", False, f"Expected 401, got {response.status_code}")
        except Exception as e:
            self.log_result("auth_flow", "invalid_token", False, f"Exception: {str(e)}")
        
        # Test /api/auth/me without token
        try:
            response = requests.get(f"{API_BASE}/auth/me", timeout=10)
            
            if response.status_code == 401:
                self.log_result("auth_flow", "no_token", True, "Correctly returned 401 for missing token")
            else:
                self.log_result("auth_flow", "no_token", False, f"Expected 401, got {response.status_code}")
        except Exception as e:
            self.log_result("auth_flow", "no_token", False, f"Exception: {str(e)}")
    
    def test_cases_crud(self):
        """Test Cases CRUD operations"""
        print("\n📋 Testing Cases CRUD...")
        
        headers = {"Authorization": f"Bearer {self.session_token}", "Content-Type": "application/json"}
        
        # Test POST /api/cases - Create a new case
        try:
            case_data = {
                "title": "Test Case for DMCA Takedown",
                "description": "This is a test case for copyright infringement",
                "priority": "high"
            }
            
            response = requests.post(f"{API_BASE}/cases", json=case_data, headers=headers, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["id", "client_id", "title", "description", "status", "priority", "created_at"]
                missing_fields = [field for field in required_fields if field not in data]
                
                if not missing_fields and data["client_id"] == self.user_id:
                    self.test_case_id = data["id"]
                    self.log_result("cases_crud", "create_case", True, f"Created case: {data['id']}")
                else:
                    self.log_result("cases_crud", "create_case", False, f"Missing fields: {missing_fields} or wrong client_id")
            else:
                self.log_result("cases_crud", "create_case", False, f"Status: {response.status_code}, Response: {response.text}")
        except Exception as e:
            self.log_result("cases_crud", "create_case", False, f"Exception: {str(e)}")
        
        # Test GET /api/cases - List all cases
        try:
            response = requests.get(f"{API_BASE}/cases", headers=headers, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    # Check if our created case is in the list
                    case_found = any(case.get("id") == self.test_case_id for case in data) if self.test_case_id else True
                    if case_found:
                        self.log_result("cases_crud", "list_cases", True, f"Found {len(data)} cases")
                    else:
                        self.log_result("cases_crud", "list_cases", False, "Created case not found in list")
                else:
                    self.log_result("cases_crud", "list_cases", False, "Response is not a list")
            else:
                self.log_result("cases_crud", "list_cases", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_result("cases_crud", "list_cases", False, f"Exception: {str(e)}")
        
        # Test GET /api/cases/{id} - Get specific case
        if self.test_case_id:
            try:
                response = requests.get(f"{API_BASE}/cases/{self.test_case_id}", headers=headers, timeout=10)
                
                if response.status_code == 200:
                    data = response.json()
                    if data.get("id") == self.test_case_id and data.get("client_id") == self.user_id:
                        self.log_result("cases_crud", "get_case", True, f"Retrieved case: {self.test_case_id}")
                    else:
                        self.log_result("cases_crud", "get_case", False, "Case data mismatch")
                else:
                    self.log_result("cases_crud", "get_case", False, f"Status: {response.status_code}")
            except Exception as e:
                self.log_result("cases_crud", "get_case", False, f"Exception: {str(e)}")
        
        # Test PATCH /api/cases/{id} - Update case status
        if self.test_case_id:
            try:
                # Note: The API expects status as a query parameter, not JSON body
                response = requests.patch(f"{API_BASE}/cases/{self.test_case_id}?status=in_review", headers=headers, timeout=10)
                
                if response.status_code == 200:
                    data = response.json()
                    if data.get("status") == "in_review":
                        self.log_result("cases_crud", "update_case", True, "Case status updated successfully")
                    else:
                        self.log_result("cases_crud", "update_case", False, f"Status not updated: {data.get('status')}")
                else:
                    self.log_result("cases_crud", "update_case", False, f"Status: {response.status_code}, Response: {response.text}")
            except Exception as e:
                self.log_result("cases_crud", "update_case", False, f"Exception: {str(e)}")
    
    def test_targets_management(self):
        """Test Targets management operations"""
        print("\n🎯 Testing Targets Management...")
        
        if not self.test_case_id:
            self.log_result("targets_management", "setup", False, "No test case available for targets testing")
            return
        
        headers = {"Authorization": f"Bearer {self.session_token}", "Content-Type": "application/json"}
        
        # Test POST /api/cases/{case_id}/targets - Add URLs to case
        try:
            target_data = {
                "urls": [
                    "https://example.com/infringing-content-1",
                    "https://test-site.com/copyrighted-material",
                    "https://another-site.org/stolen-content"
                ]
            }
            
            response = requests.post(f"{API_BASE}/cases/{self.test_case_id}/targets", json=target_data, headers=headers, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list) and len(data) == 3:
                    # Verify each target has required fields
                    valid_targets = all(
                        target.get("case_id") == self.test_case_id and
                        target.get("url") in target_data["urls"] and
                        target.get("domain") and
                        target.get("status") == "pending"
                        for target in data
                    )
                    
                    if valid_targets:
                        self.log_result("targets_management", "add_targets", True, f"Added {len(data)} targets")
                    else:
                        self.log_result("targets_management", "add_targets", False, "Invalid target data")
                else:
                    self.log_result("targets_management", "add_targets", False, f"Expected 3 targets, got {len(data) if isinstance(data, list) else 'non-list'}")
            else:
                self.log_result("targets_management", "add_targets", False, f"Status: {response.status_code}, Response: {response.text}")
        except Exception as e:
            self.log_result("targets_management", "add_targets", False, f"Exception: {str(e)}")
        
        # Test GET /api/cases/{case_id}/targets - List targets for case
        try:
            response = requests.get(f"{API_BASE}/cases/{self.test_case_id}/targets", headers=headers, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list) and len(data) >= 3:
                    # Verify targets belong to the case
                    valid_targets = all(target.get("case_id") == self.test_case_id for target in data)
                    if valid_targets:
                        self.log_result("targets_management", "list_targets", True, f"Found {len(data)} targets")
                    else:
                        self.log_result("targets_management", "list_targets", False, "Targets don't belong to case")
                else:
                    self.log_result("targets_management", "list_targets", False, f"Expected at least 3 targets, got {len(data) if isinstance(data, list) else 'non-list'}")
            else:
                self.log_result("targets_management", "list_targets", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_result("targets_management", "list_targets", False, f"Exception: {str(e)}")
    
    def test_authorization(self):
        """Test authorization - users can only access their own data"""
        print("\n🔒 Testing Authorization...")
        
        # Create a second user to test cross-user access
        try:
            timestamp = int(time.time() * 1000) + 1
            other_user_id = f"test-user-{timestamp}"
            other_session_token = f"test_session_{timestamp}"
            
            mongo_script = f'''
use('test_database');
var userId = '{other_user_id}';
var sessionToken = '{other_session_token}';
db.users.insertOne({{
  _id: userId,
  email: 'other.user.{timestamp}@example.com',
  name: 'Other Test User {timestamp}',
  picture: 'https://via.placeholder.com/150',
  created_at: new Date()
}});
db.user_sessions.insertOne({{
  user_id: userId,
  session_token: sessionToken,
  expires_at: new Date(Date.now() + 7*24*60*60*1000),
  created_at: new Date()
}});
'''
            
            result = subprocess.run(
                ["mongosh", "--eval", mongo_script],
                capture_output=True,
                text=True,
                timeout=30
            )
            
            if result.returncode != 0:
                self.log_result("authorization", "setup_other_user", False, "Failed to create second user")
                return
            
            # Test accessing first user's case with second user's token
            if self.test_case_id:
                headers = {"Authorization": f"Bearer {other_session_token}"}
                response = requests.get(f"{API_BASE}/cases/{self.test_case_id}", headers=headers, timeout=10)
                
                if response.status_code == 404:
                    self.log_result("authorization", "cross_user_case_access", True, "Correctly denied access to other user's case")
                else:
                    self.log_result("authorization", "cross_user_case_access", False, f"Expected 404, got {response.status_code}")
            
            # Test that second user can't see first user's cases in list
            headers = {"Authorization": f"Bearer {other_session_token}"}
            response = requests.get(f"{API_BASE}/cases", headers=headers, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    # Should be empty or not contain first user's cases
                    first_user_cases = [case for case in data if case.get("client_id") == self.user_id]
                    if len(first_user_cases) == 0:
                        self.log_result("authorization", "isolated_case_lists", True, "Users see only their own cases")
                    else:
                        self.log_result("authorization", "isolated_case_lists", False, "User can see other user's cases")
                else:
                    self.log_result("authorization", "isolated_case_lists", False, "Invalid response format")
            else:
                self.log_result("authorization", "isolated_case_lists", False, f"Status: {response.status_code}")
                
        except Exception as e:
            self.log_result("authorization", "cross_user_tests", False, f"Exception: {str(e)}")
    
    def run_all_tests(self):
        """Run all test suites"""
        print("🚀 Starting DMCA ContentGuard Backend API Tests")
        print(f"🌐 Base URL: {BASE_URL}")
        print(f"🔗 API Base: {API_BASE}")
        
        # Setup: Create test user and session
        if not self.create_test_user_and_session():
            print("❌ Failed to create test user. Cannot proceed with authenticated tests.")
            self.test_public_endpoints()
            return
        
        try:
            # Run all test suites
            self.test_public_endpoints()
            self.test_auth_flow()
            self.test_cases_crud()
            self.test_targets_management()
            self.test_authorization()
            
        finally:
            # Cleanup
            self.cleanup_test_data()
        
        # Print summary
        self.print_summary()
    
    def print_summary(self):
        """Print test summary"""
        print("\n" + "="*60)
        print("📊 TEST SUMMARY")
        print("="*60)
        
        total_tests = self.results["summary"]["passed"] + self.results["summary"]["failed"]
        success_rate = (self.results["summary"]["passed"] / total_tests * 100) if total_tests > 0 else 0
        
        print(f"✅ Passed: {self.results['summary']['passed']}")
        print(f"❌ Failed: {self.results['summary']['failed']}")
        print(f"📈 Success Rate: {success_rate:.1f}%")
        
        if self.results["summary"]["errors"]:
            print("\n🔍 FAILED TESTS:")
            for error in self.results["summary"]["errors"]:
                print(f"   • {error}")
        
        print("\n📋 DETAILED RESULTS:")
        for category, tests in self.results.items():
            if category != "summary":
                print(f"\n{category.upper().replace('_', ' ')}:")
                for test_name, result in tests.items():
                    status = "✅" if result["success"] else "❌"
                    print(f"   {status} {test_name}: {result['details']}")

if __name__ == "__main__":
    tester = ContentGuardAPITester()
    tester.run_all_tests()
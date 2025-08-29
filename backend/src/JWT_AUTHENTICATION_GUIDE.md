# JWT Authentication Implementation Guide

## Overview

Your Tasks Lite API now has complete JWT (JSON Web Token) authentication implemented with the following features:

- ✅ User registration with password hashing
- ✅ User login with JWT token generation
- ✅ Protected routes requiring authentication
- ✅ User-specific task management
- ✅ Secure password comparison
- ✅ Token verification middleware
- ✅ CORS support

## API Endpoints

### Authentication Endpoints

#### 1. Register User
```http
POST /api/users/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe", 
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "createdAt": "2025-08-25T...",
      "updatedAt": "2025-08-25T..."
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": "24h"
  }
}
```

#### 2. Login User
```http
POST /api/users/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "createdAt": "2025-08-25T...",
      "updatedAt": "2025-08-25T..."
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": "24h"
  }
}
```

#### 3. Get User Profile (Protected)
```http
GET /api/users/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com"
    }
  }
}
```

### Task Endpoints (All Protected)

All task endpoints now require authentication and only show tasks belonging to the authenticated user.

#### 1. Create Task
```http
POST /api/tasks
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "title": "Complete JWT Implementation",
  "description": "Add JWT authentication to the API"
}
```

#### 2. Get All Tasks (User-specific)
```http
GET /api/tasks
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### 3. Get Task by ID
```http
GET /api/tasks/123
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### 4. Update Task
```http
PUT /api/tasks/123
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "status": "in-progress"
}
```

#### 5. Delete Task
```http
DELETE /api/tasks/123
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## How to Use JWT Tokens

### 1. Client-Side Token Storage

After successful registration or login, store the JWT token securely:

```javascript
// Store token in localStorage (or better: httpOnly cookies)
const response = await fetch('/api/users/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123'
  })
});

const data = await response.json();
if (data.success) {
  localStorage.setItem('token', data.data.token);
}
```

### 2. Making Authenticated Requests

Include the token in the Authorization header:

```javascript
const token = localStorage.getItem('token');

const response = await fetch('/api/tasks', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
```

### 3. Token Expiration Handling

```javascript
const response = await fetch('/api/tasks', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

if (response.status === 401) {
  // Token expired or invalid - redirect to login
  localStorage.removeItem('token');
  window.location.href = '/login';
}
```

## Security Features

### 1. Password Hashing
- Passwords are hashed using bcrypt with 12 salt rounds
- Plain text passwords are never stored
- Secure password comparison

### 2. JWT Security
- Tokens are signed with a secret key
- Include issuer and audience claims
- Configurable expiration time (default: 24 hours)
- Token verification on protected routes

### 3. User Isolation
- Tasks are associated with specific users
- Users can only access their own tasks
- No cross-user data access

## Environment Configuration

Create a `.env` file in your backend/src directory:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# JWT Configuration - CHANGE THESE IN PRODUCTION!
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-to-a-very-long-random-string
JWT_EXPIRES_IN=24h

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Security
BCRYPT_SALT_ROUNDS=12
```

## Error Responses

### Authentication Errors
```json
{
  "success": false,
  "error": {
    "message": "Access denied. No token provided."
  }
}
```

```json
{
  "success": false,
  "error": {
    "message": "Access denied. Invalid token."
  }
}
```

### Validation Errors
```json
{
  "success": false,
  "error": {
    "message": "All fields are required: firstName, lastName, email, password"
  }
}
```

## Testing the Authentication

### 1. Using curl

Register a user:
```bash
curl -X POST http://localhost:3001/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

Login:
```bash
curl -X POST http://localhost:3001/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

Access protected route:
```bash
curl -X GET http://localhost:3001/api/tasks \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

### 2. Using Postman or Insomnia

1. Create a new request for registration
2. Set method to POST and URL to `http://localhost:3001/api/users/register`
3. Add request body with user details
4. Send request and copy the token from response
5. For protected routes, add Authorization header: `Bearer YOUR_TOKEN`

## Next Steps

1. **Frontend Integration**: Update your React frontend to use these JWT endpoints
2. **Token Refresh**: Implement token refresh mechanism for better UX
3. **Rate Limiting**: Add rate limiting to prevent brute force attacks
4. **Logout Endpoint**: Implement token blacklisting for logout
5. **Password Reset**: Add forgot password functionality
6. **Email Verification**: Add email verification for new users

## Production Considerations

1. **Secure JWT Secret**: Use a long, random string for JWT_SECRET
2. **HTTPS Only**: Always use HTTPS in production
3. **Token Storage**: Use httpOnly cookies instead of localStorage
4. **Environment Variables**: Never commit secrets to version control
5. **Token Expiration**: Consider shorter token expiration times
6. **Database**: Implement proper database for user persistence
7. **Logging**: Add proper logging for security events

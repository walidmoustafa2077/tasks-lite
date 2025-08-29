# Tasks Lite 📋

A modern, lightweight task management application built with Node.js, Express.js, and JWT authentication. This project features a RESTful API backend with comprehensive Swagger documentation for easy development and testing.

## 🚀 Features

- **User Authentication**: Secure JWT-based authentication system
- **Task Management**: Full CRUD operations for tasks
- **RESTful API**: Clean, well-structured API endpoints
- **API Documentation**: Interactive Swagger UI documentation
- **Security**: Password hashing, JWT tokens, and protected routes
- **Validation**: Input validation and error handling
- **CORS Support**: Cross-origin resource sharing enabled

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Usage Examples](#usage-examples)
- [Development](#development)
- [Contributing](#contributing)

## 🛠️ Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A text editor or IDE

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tasks-lite
   ```

2. **Install backend dependencies**
   ```bash
   cd backend/src
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables** (see [Configuration](#configuration))

5. **Start the development server**
   ```bash
   npm run dev
   ```

The API server will start on `http://localhost:3001`

## ⚙️ Configuration

Create a `.env` file in the `backend/src` directory with the following variables:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=24h

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port number | `3001` |
| `NODE_ENV` | Environment mode | `development` |
| `JWT_SECRET` | Secret key for JWT tokens | Required |
| `JWT_EXPIRES_IN` | JWT token expiration time | `24h` |
| `CORS_ORIGIN` | Allowed CORS origin | `http://localhost:3000` |

## 📚 API Documentation

Interactive API documentation is available via Swagger UI:

**🔗 [http://localhost:3001/api-docs](http://localhost:3001/api-docs)**

The Swagger documentation includes:
- Complete endpoint descriptions
- Request/response schemas
- Interactive testing interface
- Authentication examples
- Error response formats

## 📁 Project Structure

```
tasks-lite/
├── backend/
│   └── src/
│       ├── config/
│       │   ├── config.js          # Environment configuration
│       │   └── swagger.js         # Swagger API documentation setup
│       ├── controllers/
│       │   ├── taskController.js  # Task-related route handlers
│       │   └── userController.js  # User/auth route handlers
│       ├── middleware/
│       │   ├── asyncHandler.js    # Async error handling wrapper
│       │   ├── authenticate.js    # JWT authentication middleware
│       │   ├── errorHandler.js    # Global error handling
│       │   └── notFound.js        # 404 error handler
│       ├── models/
│       │   ├── task.js            # Task data model
│       │   └── user.js            # User data model
│       ├── routes/
│       │   ├── index.js           # Main route router
│       │   ├── taskRoutes.js      # Task-related routes
│       │   └── userRoutes.js      # User/auth routes
│       ├── services/
│       │   ├── authService.js     # Authentication business logic
│       │   ├── taskService.js     # Task management business logic
│       │   └── userService.js     # User management business logic
│       ├── utils/
│       │   ├── jwtUtils.js        # JWT token utilities
│       │   ├── passwordHelper.js  # Password hashing utilities
│       │   ├── updateTaskValidator.js  # Task validation
│       │   └── userValidator.js   # User validation
│       ├── package.json
│       └── server.js              # Main application entry point
├── frontend/                      # Frontend application (to be implemented)
└── README.md
```

## 🌐 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/users/register` | Register a new user | ❌ |
| `POST` | `/api/users/login` | Login user | ❌ |
| `GET` | `/api/users/profile` | Get user profile | ✅ |

### Task Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/tasks` | Get all user tasks | ✅ |
| `POST` | `/api/tasks` | Create a new task | ✅ |
| `GET` | `/api/tasks/:id` | Get specific task | ✅ |
| `PUT` | `/api/tasks/:id` | Update specific task | ✅ |
| `DELETE` | `/api/tasks/:id` | Delete specific task | ✅ |

## 🔐 Authentication

This API uses JWT (JSON Web Tokens) for authentication. Here's how it works:

### 1. Register/Login
```bash
# Register new user
POST /api/users/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### 2. Get JWT Token
The response will include a JWT token:
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "user-id",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com"
    }
  }
}
```

### 3. Use Token for Protected Routes
Include the token in the Authorization header:
```bash
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 💡 Usage Examples

### Register a New User
```bash
curl -X POST http://localhost:3001/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane@example.com",
    "password": "securepass123"
  }'
```

### Login
```bash
curl -X POST http://localhost:3001/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane@example.com",
    "password": "securepass123"
  }'
```

### Create a Task
```bash
curl -X POST http://localhost:3001/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Complete project documentation",
    "description": "Write comprehensive README and API docs"
  }'
```

### Get All Tasks
```bash
curl -X GET http://localhost:3001/api/tasks \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🧪 Development

### Available Scripts

```bash
# Start production server
npm start

# Start development server with auto-reload
npm run dev

# Run tests (when implemented)
npm test
```

### Development Features

- **Hot Reload**: Use `npm run dev` for automatic server restart on file changes
- **Error Handling**: Comprehensive error handling with detailed error messages
- **Logging**: Server logs include startup information and request details
- **CORS**: Configured for frontend development
- **Validation**: Input validation on all endpoints

### Testing with Swagger UI

1. Start the server: `npm run dev`
2. Open [http://localhost:3001/api-docs](http://localhost:3001/api-docs)
3. Test authentication flow:
   - Register/login to get a JWT token
   - Click "Authorize" and enter your token
   - Test protected endpoints

## 🏗️ Architecture

### Design Patterns

- **MVC Pattern**: Separation of concerns with models, controllers, and routes
- **Service Layer**: Business logic separated from route handlers
- **Middleware Pattern**: Reusable middleware for authentication, error handling
- **Utility Functions**: Common functionality abstracted into utility modules

### Security Features

- **Password Hashing**: Using bcryptjs for secure password storage
- **JWT Authentication**: Stateless authentication with secure tokens
- **Input Validation**: Server-side validation for all inputs
- **Error Handling**: Secure error messages that don't leak sensitive information
- **CORS Protection**: Configured cross-origin resource sharing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code structure and naming conventions
- Add appropriate error handling for new features
- Update API documentation when adding new endpoints
- Test your changes using the Swagger UI interface

## 📝 License

This project is licensed under the ISC License.

## 🔮 Future Enhancements

- [ ] Frontend React application
- [ ] Database integration (MongoDB)
- [ ] Task categories and tags
- [ ] Due dates and reminders
- [ ] Task priority levels
- [ ] User profile management
- [ ] Task sharing and collaboration
- [ ] Email notifications
- [ ] File attachments for tasks
- [ ] Advanced filtering and search

## 📞 Support

If you encounter any issues or have questions:

1. Check the [API Documentation](http://localhost:3001/api-docs)
2. Review the server logs for error details
3. Ensure all environment variables are properly configured
4. Verify JWT tokens are correctly formatted

---

**Built with ❤️ using Node.js, Express.js, and modern web technologies.**

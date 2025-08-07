# Server - Backend API

Express.js backend providing REST API endpoints for the Unitas LogistiX platform.

## Purpose
- Provide secure API endpoints for frontend
- Handle user authentication and sessions
- Manage database operations
- Serve static files and API responses

## Key Technologies
- Express.js with TypeScript
- PostgreSQL with Drizzle ORM
- bcryptjs for password hashing
- express-session for authentication
- Memory Store for development sessions

## Project Structure
```
server/
├── routes.ts     # All API endpoints and middleware
├── storage.ts    # Database operations interface
├── index.ts      # Express server setup and configuration
└── vite.ts       # Vite integration for development
```

## Key Files
- `index.ts` - Express server initialization, middleware setup
- `routes.ts` - API route definitions and authentication logic
- `storage.ts` - Database abstraction layer with CRUD operations

## API Endpoints

### Authentication Routes
- `POST /api/auth/signin` - User login with credentials validation
- `POST /api/auth/signup` - User registration with password hashing
- `POST /api/auth/signout` - User logout and session cleanup
- `GET /api/auth/user` - Get current authenticated user

### Dashboard Routes
- `GET /api/dashboard/stats` - Dashboard statistics and metrics
- `GET /api/jobs` - List user jobs with filtering
- `GET /api/bills` - List user bills and invoices
- `GET /api/requests` - List user service requests
- `POST /api/requests` - Create new service request
- `PUT /api/profile` - Update user profile information

### Public Routes
- `POST /api/contact` - Contact form submissions
- `POST /api/quote` - Quote request submissions
- `POST /api/tracking` - Shipment tracking lookup

## Authentication Flow
1. Client sends POST request to `/api/auth/signin`
2. Server validates email/password against database users
3. Password verified using bcrypt comparison
4. Session created and stored (memory for dev, PostgreSQL for prod)
5. User data returned to client (excluding password)

## Error Handling
- Invalid credentials return: `{"error": "Invalid credentials"}`
- Validation errors include field-specific messages
- Database errors logged and sanitized for client response
- Session errors result in 401 Unauthorized responses

## Security Features
- Password hashing with bcryptjs (salt rounds)
- HTTP-only session cookies
- Input validation using Zod schemas
- CORS protection for cross-origin requests
- Session timeout and cleanup

## How It Fits Into the Project
- Backend layer serving the React frontend (`/client`)
- Uses shared schemas (`/shared`) for validation
- Connects to PostgreSQL database for persistence
- Provides authenticated API for dashboard functionality

## Development
```bash
cd server
npm install
npm run dev  # Development with hot reload
npm start    # Production server
```

## Dependencies on Other Parts
- **Database** (PostgreSQL) for data persistence
- **Shared schemas** (`/shared`) for type safety and validation
- **Frontend** (`/client`) as primary consumer of API endpoints
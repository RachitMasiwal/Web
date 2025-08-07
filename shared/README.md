# Shared - Common Types and Schemas

Shared code between frontend and backend for type safety and consistency.

## Purpose
- Define database table schemas using Drizzle ORM
- Provide Zod validation schemas for API requests
- Export TypeScript types for frontend and backend
- Ensure type safety across the entire application

## Key Technologies
- Drizzle ORM for database schema definition
- Zod for runtime validation and type inference
- TypeScript for compile-time type checking

## Project Structure
```
shared/
└── schema.ts    # All database models, validation schemas, and types
```

## Key Components

### Database Tables
- `users` - User accounts with authentication credentials
- `jobs` - Shipment jobs and logistics operations
- `bills` - Invoicing and billing information
- `requests` - Service requests from users
- `contacts` - Contact form submissions
- `quotes` - Quote requests from website
- `shipments` - Shipment tracking information
- `trackingEvents` - Shipment status updates

### Validation Schemas
- `signUpSchema` - User registration form validation
- `signInSchema` - User login form validation
- `insertJobSchema` - Job creation validation
- `insertBillSchema` - Bill creation validation
- `sendRequestSchema` - Service request validation
- `updateProfileSchema` - Profile update validation

### TypeScript Types
- `User` - User account type
- `Job` - Job/shipment type
- `Bill` - Invoice type
- `Request` - Service request type
- `SignUp` - Registration form type
- `SignIn` - Login form type

## Authentication Schema Flow
```typescript
// Frontend form validation
const formData = signInSchema.parse(userInput);

// API request to backend
POST /api/auth/signin with validated data

// Backend validation (same schema)
const credentials = signInSchema.parse(req.body);
```

## Database Schema Management
- Use Drizzle ORM for type-safe database operations
- Run `npm run db:push` to apply schema changes
- Schemas automatically generate TypeScript types
- Insert/select schemas created with `createInsertSchema`

## How It Fits Into the Project
- **Frontend** (`/client`) imports types and validation schemas
- **Backend** (`/server`) uses schemas for API validation
- **Database** structure defined by table schemas
- Ensures consistency between all layers of the application

## Key Files
- `schema.ts` - Complete database and validation schema definitions

## Usage Examples

### Frontend Form Validation
```typescript
import { signInSchema, type SignIn } from '@shared/schema';

const form = useForm<SignIn>({
  resolver: zodResolver(signInSchema)
});
```

### Backend API Validation
```typescript
import { signInSchema } from '@shared/schema';

app.post('/api/auth/signin', (req, res) => {
  const credentials = signInSchema.parse(req.body);
  // credentials is now type-safe and validated
});
```

### Database Operations
```typescript
import { users, type User } from '@shared/schema';

const user: User = await db.select().from(users).where(eq(users.email, email));
```

## Dependencies
- Used by both `/client` and `/server`
- No external dependencies on other project parts
- Foundation layer for type safety across the application
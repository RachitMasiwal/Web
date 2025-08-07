# Client - Frontend Application

The main public website for Unitas LogistiX built with React and TypeScript.

## Purpose
- Public-facing website with logistics services information
- User authentication (sign in/sign up)
- Dashboard for authenticated users
- Responsive design with modern UI components

## Key Technologies
- React 18 with TypeScript
- Vite for fast development and building
- Wouter for lightweight routing
- Tailwind CSS + shadcn/ui for styling
- Framer Motion for smooth animations
- TanStack React Query for data fetching

## Project Structure
```
client/
├── src/
│   ├── components/    # Reusable UI components
│   ├── pages/         # Route components
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utilities and configurations
│   └── index.css      # Global styles
├── public/            # Static assets
└── vite.config.ts     # Vite configuration
```

## Key Files
- `src/App.tsx` - Main application with routing setup
- `src/pages/sign-in.tsx` - Authentication login form
- `src/pages/dashboard/` - Protected dashboard pages
- `src/components/layout/` - Navigation and layout components
- `src/lib/queryClient.ts` - API request configuration

## How It Fits Into the Project
- Frontend layer of the full-stack application
- Communicates with backend API at `/server`
- Uses shared types and schemas from `/shared`
- Protected routes require authentication via backend sessions

## Authentication Flow
1. User submits login form in `pages/sign-in.tsx`
2. API request sent to `server/routes.ts` → `POST /api/auth/signin`
3. Backend validates credentials against database
4. Session created on success, user redirected to dashboard

## Development
```bash
cd client
npm install
npm run dev  # Development server with HMR
npm run build  # Production build
```

## Dependencies on Other Parts
- **Backend API** (`/server`) for all data operations
- **Shared schemas** (`/shared`) for type safety
- **Database** via backend for user authentication and data
# Replit.md

## Overview

This is a modern logistics and freight forwarding website for Unitas LogistiX, built with a full-stack TypeScript architecture. The application provides comprehensive logistics services including air freight, ocean freight, ground transportation, warehousing, customs clearance, and supply chain management. The website features real-time shipment tracking, contact forms, quote requests, and a professional corporate presentation with animated UI elements.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (December 2024)

- **Migration Complete**: Successfully migrated from Replit Agent to full Replit environment
- **Authentication System**: Added complete user authentication with sign up/sign in functionality
- **Database Integration**: Upgraded from in-memory storage to PostgreSQL with proper session management
- **UI Enhancements**: Fixed button styling issues and added responsive authentication pages
- **Security Features**: Implemented bcrypt password hashing and secure session storage

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing with pages for Home, Services, Tracking, About, and Contact
- **UI Framework**: Tailwind CSS for utility-first styling with shadcn/ui component library providing pre-built, accessible components
- **Animations**: Framer Motion for smooth page transitions, scroll animations, and interactive elements
- **State Management**: TanStack React Query for server state management, caching, and data fetching
- **Form Handling**: React Hook Form with Zod validation for type-safe form schemas

### Backend Architecture
- **Server**: Express.js with TypeScript for RESTful API endpoints
- **Development**: Hot module replacement (HMR) with Vite middleware integration
- **API Routes**: Modular route structure with endpoints for contact forms, quote requests, and shipment tracking
- **Data Validation**: Zod schemas shared between client and server for consistent validation

### Database & Data Storage
- **ORM**: Drizzle ORM configured for PostgreSQL with type-safe database operations
- **Database**: PostgreSQL as the primary database (configured via Neon serverless)
- **Schema**: Well-defined tables for users, contacts, quotes, shipments, and tracking events
- **Development Storage**: In-memory storage implementation for development with sample data

### Component Architecture
- **Layout Components**: Reusable navbar and footer with responsive design
- **Page Components**: Dedicated components for each route with motion animations
- **UI Components**: Comprehensive shadcn/ui library including forms, cards, dialogs, and interactive elements
- **Custom Components**: Specialized logistics components like tracking forms, contact forms, and animated counters

### Styling & Design System
- **Design System**: Custom CSS variables for logistics-specific color palette and theming
- **Responsive Design**: Mobile-first approach with Tailwind CSS breakpoints
- **Animation System**: Custom animation utilities and scroll-triggered animations
- **Typography**: Consistent typography scale with proper heading hierarchy

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **@tanstack/react-query**: Server state management and data fetching
- **drizzle-orm & drizzle-kit**: Type-safe ORM and database toolkit
- **framer-motion**: Advanced animation library for React
- **react-hook-form**: Performant form library with minimal re-renders

### UI Component Libraries
- **@radix-ui/react-***: Headless, accessible UI primitives (accordion, dialog, dropdown, etc.)
- **class-variance-authority**: Type-safe variant API for component styling
- **tailwind-merge**: Utility for merging Tailwind CSS classes
- **lucide-react**: Modern icon library with React components

### Development Tools
- **Vite**: Fast build tool with HMR support
- **TypeScript**: Static type checking across the entire stack
- **PostCSS**: CSS processing with Tailwind CSS and Autoprefixer
- **ESBuild**: Fast JavaScript bundler for production builds

### Validation & Utilities
- **zod**: Type-safe schema validation library
- **date-fns**: Date manipulation and formatting utilities
- **clsx**: Conditional className utility
- **wouter**: Lightweight React router

### Optional Integrations
The project structure supports integration with additional services like email providers for contact forms, payment gateways for shipping quotes, and external tracking APIs for real-time shipment updates.
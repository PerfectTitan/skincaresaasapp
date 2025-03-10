# GlowSage - Personalized Skincare SaaS Platform

GlowSage is a personalized skincare platform that leverages AI to analyze user skin concerns and provide tailored product recommendations and routines, with progress tracking capabilities.

## Features

- Interactive skin assessment quiz
- AI-powered recommendation engine
- User dashboard with routine tracking
- Progress photos and skin health metrics
- Authentication via Supabase

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository
2. Install dependencies
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
4. Start the development server
   ```
   npm run dev
   ```

## Supabase Setup

1. Create a new Supabase project
2. Run the SQL migration in `supabase/migrations/20240101000000_initial_schema.sql`
3. Set up authentication in the Supabase dashboard:
   - Enable Email/Password sign-in
   - Configure email templates
   - Set up redirect URLs for authentication

## Project Structure

- `/src/components` - UI components
- `/src/contexts` - React context providers
- `/src/pages` - Application pages
- `/src/lib` - Utility functions and API clients
- `/src/types` - TypeScript type definitions

## Authentication Flow

The app uses Supabase Authentication with the following flow:

1. User signs up or logs in
2. New users are redirected to the skin quiz
3. Returning users are redirected to their dashboard
4. Protected routes are guarded by the AuthGuard component

## Database Schema

The application uses the following tables in Supabase:

- `profiles` - User profile information
- `skin_profiles` - User skin assessment results
- `skincare_routines` - Personalized skincare routines
- `progress_logs` - Daily routine tracking
- `skin_metrics` - Skin health metrics over time

## License

MIT

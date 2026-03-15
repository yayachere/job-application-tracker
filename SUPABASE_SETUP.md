# Supabase Database Integration Guide

## What Changed
The application now saves all user data to Supabase database instead of localStorage. This ensures data persists across devices and browsers.

## How It Works

### 1. Authentication
- Users sign up/login with Supabase Auth
- After email confirmation, they're authenticated

### 2. Data Storage
- All job applications are stored in the `applications` table
- Each user can only see their own applications (RLS enforces this)
- User profile data is stored in the `profiles` table

### 3. Dashboard
- The dashboard (`/dashboard`) now uses `useApplicationsDB` hook
- This hook fetches data directly from Supabase
- CRUD operations (Create, Read, Update, Delete) save to the database

## Database Schema

### profiles table
```
id (UUID) - Primary key, references auth.users(id)
first_name (text)
last_name (text)
created_at (timestamp)
updated_at (timestamp)
```

### applications table
```
id (UUID) - Primary key
user_id (UUID) - Foreign key to auth.users(id)
company (text)
role (text)
platform (text)
status (text) - applied, interviewing, offer, rejected, accepted
date_applied (date)
notes (text)
salary (text)
location (text)
application_link (text)
resume_version (text)
follow_up_date (date)
needs_follow_up (boolean)
created_at (timestamp)
updated_at (timestamp)
```

## Verify Your Database Setup

To check if your tables are set up correctly:

1. Go to Supabase Dashboard
2. Click "SQL Editor"
3. Run these queries to verify:

```sql
-- Check profiles table
SELECT * FROM public.profiles LIMIT 1;

-- Check applications table
SELECT * FROM public.applications LIMIT 1;

-- Check RLS is enabled
SELECT tablename FROM pg_tables 
WHERE schemaname = 'public' AND tablename IN ('profiles', 'applications');
```

## Troubleshooting

### "Table does not exist" error
- Make sure you ran the SQL migration scripts in your Supabase dashboard
- Check that the tables are in the `public` schema

### "Row Level Security (RLS) violation"
- Confirm RLS policies are enabled for both tables
- Verify the user is authenticated before performing operations

### Data not persisting
- Check browser console for error messages
- Verify user_id is being captured correctly
- Ensure Supabase env variables are set correctly

## File Structure Changes

Key files that use Supabase:
- `hooks/use-applications-db.ts` - Database operations hook
- `app/dashboard/page.tsx` - Uses the database hook
- `lib/supabase/client.ts` - Supabase client setup
- `lib/supabase/server.ts` - Server-side Supabase client
- `middleware.ts` - Handles session persistence

## Migration Path

- Old localStorage data is still available on the `/` root page
- Authenticated users use the `/dashboard` with Supabase database
- Eventually, you can deprecate the localStorage version

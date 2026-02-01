# Supabase Admin Authentication Setup

## Step 1: Create Admin User

Go to your Supabase dashboard → Authentication → Users → Add user

Create a user with:

- **Email**: your-admin-email@example.com (use your actual email)
- **Password**: Create a strong password
- **Email confirmed**: Check this box

## Step 2: Enable Row Level Security (Optional but Recommended)

Run these SQL commands in Supabase SQL Editor (Database → SQL Editor):

```sql
-- Enable RLS on appointments table
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert appointments (for bookings)
CREATE POLICY "Allow public to create bookings"
ON appointments FOR INSERT
TO anon
WITH CHECK (true);

-- Allow authenticated admins to view all appointments
CREATE POLICY "Allow admins to view appointments"
ON appointments FOR SELECT
TO authenticated
USING (true);

-- Allow authenticated admins to update/delete appointments
CREATE POLICY "Allow admins to manage appointments"
ON appointments FOR ALL
TO authenticated
USING (true);

-- Similar policies for other admin tables
ALTER TABLE availability_overrides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow admins to manage availability"
ON availability_overrides FOR ALL
TO authenticated
USING (true);

ALTER TABLE weekly_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow admins to manage templates"
ON weekly_templates FOR ALL
TO authenticated
USING (true);

ALTER TABLE availabilities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow admins to manage availabilities"
ON availabilities FOR ALL
TO authenticated
USING (true);

-- Allow public read access to check availability
CREATE POLICY "Allow public to read availabilities"
ON availabilities FOR SELECT
TO anon
USING (true);
```

## Step 3: Test Admin Login

1. Go to your website
2. Click "Admin Login"
3. Enter the email and password you created in Step 1
4. You should now have secure access to the admin dashboard

## Security Benefits

✅ No hardcoded passwords in source code
✅ Passwords stored securely server-side
✅ Session-based authentication
✅ Automatic token refresh
✅ Row Level Security prevents unauthorized access
✅ Can add multiple admin users easily

## Troubleshooting

**Login fails**: Check that:

- Email confirmation is enabled in Supabase dashboard
- Your Supabase URL and anon key are correct in constants.tsx
- The user exists in Authentication → Users

**Can't access data**: Make sure you've run the RLS policies SQL above.

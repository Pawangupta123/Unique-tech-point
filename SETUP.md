# Admin panel setup (Supabase)

The website runs on sample data until you connect Supabase. Follow these steps
to activate the admin panel (add/edit products, upload photos, view enquiries).

## 1. Create a free Supabase project
1. Go to https://supabase.com → sign in → **New project**.
2. Pick a name (e.g. `unique-tech-point`), set a strong database password, choose
   a region close to India (e.g. **Mumbai / ap-south-1**), and create it.

## 2. Create the database tables
1. In the project, open **SQL Editor → New query**.
2. Paste the entire contents of [`supabase/schema.sql`](supabase/schema.sql) and click **Run**.
   This creates the `products` and `enquiries` tables, search, security rules,
   and the `product-images` storage bucket.

## 3. Get your API keys
Open **Project Settings → API** and copy:
- **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
- **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (keep secret!)

## 4. Create the admin login
1. Open **Authentication → Users → Add user → Create new user**.
2. Enter the owner's email + a password. **Confirm** the user (auto-confirm).
3. Use that same email as `ADMIN_EMAIL`.

## 5. Add the keys to the project
Create a file named **`.env.local`** in the project root (copy from
`.env.local.example`) and fill in:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_EMAIL=owner@example.com
```

## 6. Restart
Stop and restart the dev server (`npm run dev`). Go to **`/admin`**, log in with
the email/password from step 4, and start adding products.

> When you deploy (e.g. Vercel), add the same 4 environment variables in the
> hosting dashboard.

# Backend setup — Supabase + Resend

This site's forms (lead popup, contact/enquiry page, sample requests) and admin
dashboard (projects, resources, articles, image uploads) run on two free
services:

- **[Supabase](https://supabase.com)** — Postgres database + file storage for
  everything the admin dashboard manages (leads, sample requests, projects,
  resources, articles, uploaded images).
- **[Resend](https://resend.com)** — sends the auto-reply email to whoever
  fills a form, plus a notification email to `info@craftmint.in`.

Both have generous free tiers (Supabase: 500MB DB + 1GB storage; Resend:
3,000 emails/month) and neither requires a credit card to start.

## 1. Supabase

1. Go to [supabase.com](https://supabase.com) → **New project**. Pick any
   name/region, set a database password (you won't need it day-to-day).
2. Once the project is ready, open **SQL Editor** → **New query**, paste in
   the contents of [`supabase/schema.sql`](supabase/schema.sql), and run it.
   This creates the 5 tables the app uses and a public `uploads` storage
   bucket for images.
3. Go to **Project Settings → Data API** and copy the **Project URL**.
4. Go to **Project Settings → API Keys** and copy the **`service_role`**
   secret key (not the `anon` public key — the app uses the service role key
   server-side only, it's never exposed to the browser).
5. Add both to `.env.local`:
   ```
   SUPABASE_URL=https://xxxxxxxx.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=eyJ...
   ```

### Migrating the existing local data (optional)

There's one test project (`Good`) currently sitting in `lib/db/projects.json`.
To copy it (and anything else in `lib/db/*.json`) into Supabase:

```bash
node --env-file=.env.local scripts/migrate-to-supabase.mjs
```

Safe to re-run — it upserts by id.

## 2. Resend (email)

1. Go to [resend.com](https://resend.com) → sign up (free).
2. **Domains → Add Domain** → enter `craftmint.in`. Resend gives you a
   handful of DNS records (SPF, DKIM, and optionally a tracking CNAME).
3. Add those records at wherever `craftmint.in`'s DNS is managed (your
   domain registrar, or Cloudflare/similar if you use one). Back in Resend,
   click **Verify** once they've propagated (usually minutes, sometimes up
   to a few hours).
4. **API Keys → Create API Key** (Sending access is enough).
5. Add to `.env.local`:
   ```
   RESEND_API_KEY=re_...
   EMAIL_FROM=Craftmint LLP <info@craftmint.in>
   EMAIL_NOTIFY_TO=info@craftmint.in
   ```

Until the domain is verified, Resend will reject sends from
`info@craftmint.in`. If you want to test emails before that finishes, you can
temporarily set `EMAIL_FROM` to `onboarding@resend.dev` (Resend's shared test
sender) — swap it back once `craftmint.in` is verified.

## 3. Deploying (Vercel)

This project is already linked to a Vercel project (`craftmint`). Add the
same variables from `.env.local` to it, then redeploy:

```bash
vercel env add SUPABASE_URL production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
vercel env add RESEND_API_KEY production
vercel env add EMAIL_FROM production
vercel env add EMAIL_NOTIFY_TO production
```

(Or do it via **Vercel Dashboard → craftmint → Settings → Environment
Variables**.) Repeat for the `ADMIN_PASSWORD` / `ADMIN_SESSION_SECRET` vars
too if they aren't already set there.

## What changed under the hood

- `lib/store.ts` now reads/writes Supabase instead of local JSON files
  (`lib/db/*.json`, kept only as a historical fixture — no longer read at
  runtime). This matters because Vercel's filesystem is read-only in
  production, so the old JSON-file store silently lost every lead and
  admin edit on each deploy.
- `app/api/admin/upload/route.ts` uploads to Supabase Storage instead of
  `public/uploads/`, for the same reason.
- `app/api/leads/route.ts` and `app/api/sample-requests/route.ts` now send
  two emails on submit (via `lib/email.ts`): an auto-reply to the
  submitter, and a notification to `EMAIL_NOTIFY_TO`. Both forms already
  posted to these routes (lead popup, contact page, sample-request page) —
  no form changes were needed.
- Admin pages are now `force-dynamic` (always fresh — an admin dashboard
  showing stale leads would defeat the purpose). Public pages that display
  admin-managed content (homepage, projects, journal, resources) revalidate
  every 60 seconds, so edits in the admin dashboard show up live without a
  redeploy.

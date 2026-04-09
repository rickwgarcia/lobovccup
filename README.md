# Lobo VC Cup 2026

UNM's student startup investment competition. Student VCs pitch for real capital and deploy it into student-founded startups.

**Stack:** Vanilla HTML/CSS/JS · Node.js/Express · Supabase · Vercel

---

## Project Structure

```
lobo-vc-cup/
├── api/
│   └── index.js             ← Vercel serverless entry (wraps Express)
├── frontend/
│   ├── index.html           ← Landing page
│   ├── assets/styles/       ← CSS
│   └── pages/
│       ├── register.html    ← Auth + team registration
│       ├── submissions.html ← File upload portal (protected)
│       └── admin.html       ← Admin dashboard (admin role only)
├── backend/src/             ← Express app (routes, controllers, middleware, services)
├── content/                 ← Editable markdown — update text here, no code changes needed
│   ├── home.md
│   ├── founder-guide.md
│   ├── vc-guide.md
│   ├── schedule.md
│   └── faq.md
├── database/
│   ├── schema.sql           ← Run this in Supabase SQL Editor
│   └── seed.sql             ← Reference seed data (see comments inside)
└── vercel.json              ← Vercel deployment config
```

---

## Deploy to Vercel

### 1. Supabase setup

1. Create a project at [supabase.com](https://supabase.com)
2. Run `database/schema.sql` in the **SQL Editor**
3. Under **Storage**, create these six **private** buckets:
   - `pitch-decks`, `lp-videos`, `deal-memos`, `term-sheets`, `due-diligence`, `portfolio-summaries`
4. Under **Authentication → URL Configuration**, add your Vercel domain as the Site URL

### 2. Deploy

Push this repo to GitHub, then import it into Vercel. Set these environment variables in the Vercel dashboard (**Settings → Environment Variables**):

| Variable | Where to find it |
|----------|-----------------|
| `SUPABASE_URL` | Supabase → Project Settings → API |
| `SUPABASE_ANON_KEY` | Supabase → Project Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Project Settings → API (secret key) |
| `FRONTEND_URL` | Your Vercel domain, e.g. `https://lobovccup.vercel.app` |
| `RESEND_API_KEY` | Optional — [resend.com](https://resend.com). Emails log to console if omitted. |

Vercel will run `npm install` in the `backend/` directory automatically via the build config.

### 3. Grant admin access

After Rob or Andoni registers through the portal, run this in the Supabase SQL Editor:

```sql
UPDATE public.users SET role = 'admin' WHERE email = 'delcampo@unm.edu';
```

---

## Local Development

```bash
cd backend
npm install
cp .env.example .env   # fill in your Supabase keys
npm run dev
```

Open `http://localhost:3000`. Express serves the frontend statically in dev mode — no second server needed.

---

## Updating Content

Edit files in `/content/` — no code changes or restarts needed.

| File | Controls |
|------|----------|
| `content/home.md` | "What is Lobo VC Cup?" section on homepage |
| `content/founder-guide.md` | Founder guide modal |
| `content/vc-guide.md` | VC guide modal |
| `content/schedule.md` | Full schedule |
| `content/faq.md` | FAQ on register page |

---

## API Routes

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/api/auth/signup` | — | Create account (UNM email only) |
| POST | `/api/auth/login` | — | Log in, receive JWT |
| GET | `/api/auth/me` | Bearer | Current user |
| POST | `/api/teams` | Bearer | Register a team |
| GET | `/api/teams/me` | Bearer | Current user's team |
| POST | `/api/submissions/upload` | Bearer | Upload a file |
| GET | `/api/submissions/me` | Bearer | Current team's submissions |
| GET | `/api/submissions/download/:id` | Bearer | Signed download URL |
| GET | `/api/deals` | Bearer | VC team's deals grouped by company |
| GET | `/api/admin/teams` | Admin | All teams |
| PATCH | `/api/admin/teams/:id` | Admin | Update eligibility |
| GET | `/api/admin/stats` | Admin | Dashboard stats |
| GET | `/api/content/:page` | — | Parsed markdown as HTML |

---

## Contact

- **Rob DelCampo** — delcampo@unm.edu
- **Andoni Gajjo** — agajjo@unm.edu

Anderson School of Management, University of New Mexico

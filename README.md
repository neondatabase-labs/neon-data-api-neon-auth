# note.

This project demonstrates how to build a note-taking application using Neon's Data API (powered by PostgREST), and Neon Auth for authentication. Instead of using traditional database access via a backend, this demo showcases how to leverage Neon's Data API for direct-to-database queries with a very elegant JS SDK.

**Neon Data API (PostgREST-compatible)**

- Instant REST API for your Postgres database
- Built-in filtering, pagination, and relationships
- Automatic OpenAPI documentation

This demo is built with:

- [Neon](https://neon.tech) — Serverless Postgres
- [Neon Auth](https://neon.com/docs/auth/overview) — Authentication with automatic JWT integration
- [Neon Data API](https://neon.com/docs/data-api/get-started) — Direct database access from the frontend

> **See it in action:** [Live Demo](https://neon-data-api-neon-auth.vercel.app/)
>
> **Tip:** If you encounter issues with social login providers, try email/password instead.

## Prerequisites

Before you begin, ensure you have:

- [Bun](https://bun.sh/) (v1.0 or newer) installed
- A [Neon account](https://console.neon.tech/signup) (free tier works)

## Getting Started

### 1. Create a Neon Project with Auth and Data API

1. Go to [pg.new](https://pg.new) to create a new Neon project
2. In the Neon Console, navigate to your project and enable:
   - **Neon Auth** — Go to the **Auth** page in the left sidebar and follow the setup wizard
   - **Data API** — Go to the **Data API** page in the left sidebar and enable it

For detailed instructions, see:

- [Getting started with Neon Auth](https://neon.com/docs/auth/overview)
- [Getting started with Data API](https://neon.com/docs/data-api/get-started)

### 2. Clone and Install

```bash
git clone https://github.com/neondatabase-labs/neon-data-api-neon-auth.git
cd neon-data-api-neon-auth
bun install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
# Neon Data API URL
# Find this in Neon Console → Data API page → "Data API URL"
VITE_NEON_DATA_API_URL=https://your-project-id.data-api.neon.tech

# Neon Auth Base URL
# Find this in Neon Console → Auth page → "Auth Base URL"
VITE_NEON_AUTH_URL=https://your-project-id.auth.neon.tech

# Database Connection String (for migrations)
# Find this in Neon Console → Dashboard → Connection string (select "Pooled connection")
DATABASE_URL=postgresql://user:password@your-project-id.pooler.region.neon.tech/neondb?sslmode=require
```

### 4. Set Up the Database

Run the migration to create the tables and RLS policies:

```bash
bun run db:migrate
```

This will:

- Grant appropriate permissions to the `authenticated` and `anonymous` database roles
- Create the `notes` and `paragraphs` tables with RLS policies

### 5. Start the Development Server

```bash
bun dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Deployment on Vercel

### 1. Push to GitHub

If you haven't already, push your code to a GitHub repository:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 2. Import Project in Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (or create an account)
2. Click **"Add New..."** → **"Project"**
3. Select **"Import Git Repository"** and choose your repository
4. Vercel will auto-detect the Vite framework

### 3. Configure Environment Variables

In the Vercel project settings, add these environment variables:

| Variable                 | Value                                        | Where to find it             |
| ------------------------ | -------------------------------------------- | ---------------------------- |
| `VITE_NEON_DATA_API_URL` | `https://your-project-id.data-api.neon.tech` | Neon Console → Data API page |
| `VITE_NEON_AUTH_URL`     | `https://your-project-id.auth.neon.tech`     | Neon Console → Auth page     |

> **Note:** You don't need `DATABASE_URL` on Vercel — migrations are run locally during development.

### 4. Deploy

Click **"Deploy"** and wait for the build to complete. Your app will be live at `your-project.vercel.app`.

### 5. Update Allowed Origins (Important!)

After deployment, update your Neon Auth settings to allow your Vercel domain:

1. Go to Neon Console → Auth page
2. Add your Vercel URL (e.g., `https://your-project.vercel.app`) to the allowed origins

## Development Notes

### Schema Changes

If you modify `src/db/schema.ts`, generate new migrations with:

```bash
bun run db:generate
bun run db:migrate
```

The `db:generate` command creates SQL migration files in the `/drizzle` folder based on your schema changes. You only need this when changing the database schema.

## Learn More

- [Neon Data API Documentation](https://neon.com/docs/data-api/get-started)
- [Neon Data API Tutorial](https://neon.com/docs/data-api/demo)
- [Neon Auth Documentation](https://neon.com/docs/auth/overview)

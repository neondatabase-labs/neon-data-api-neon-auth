# note.

A modern note-taking application built with Neon's Data API (powered by PostgREST) and Neon Auth. Instead of using traditional database access via a backend, this demo showcases how to leverage Neon's Data API for direct-to-database queries with a very elegant JS SDK. Includes Row-Level Security (RLS) policies to ensure secure data access.

**Neon Data API (PostgREST-compatible)**

- Instant REST API for your Postgres database
- Built-in filtering, pagination, and relationships
- Automatic OpenAPI documentation (served at the root of your Data API)

This demo is built with:

- [Neon](https://neon.tech)
- [Neon Auth](https://neon.tech/docs/guides/neon-auth)
- [Neon Data API](https://neon.tech/docs/data-api/get-started) (PostgREST-compatible)

## Prerequisites

- [Git](https://git-scm.com/)
- [Bun](https://bun.sh/) (v1.0 or newer)
- A [Neon](https://neon.tech) account

## Quick Start

1. Clone and install:

   ```bash
   git clone https://github.com/neondatabase-labs/neon-data-api-neon-auth
   cd neon-data-api-neon-auth
   bun install
   ```

2. Set up Neon:

   - Create a project
   - Enable [Data API](https://neon.tech/docs/data-api/get-started) from the **Branch** details page. Copy your Data API URL.
   - Enable [Neon Auth](https://neon.tech/docs/guides/neon-auth) from **Project > Auth**. Copy your environment variables from the **Setup instructions**.

3. Configure environment:

   Create a `.env` file in the project root with the following variables:

   ```env
   # Neon Data API (from Branch details)
   VITE_DATA_API_URL=your_neon_data_api_url

   # Neon Auth (from Auth setup)
   VITE_PUBLIC_STACK_PROJECT_ID=your_project_id
   VITE_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=your_client_key

   # Optional (for migrations)
   DATABASE_URL=your_database_connection_string
   ```

4. Start the development server:

   ```bash
   bun dev
   ```
   The app will be available at `http://localhost:5173`

5. Build for production:

   ```bash
   bun run build
   ```

## Database Setup

Run these commands to set up your database schema (requires `DATABASE_URL` in your `.env`):

```bash
bun run db:generate
bun run db:migrate
```

The schema includes Row-Level Security (RLS) policies using Drizzle ORM, making sure that:

- Users can only access their own notes
- Shared notes are visible to authenticated users
- Paragraphs are protected by the same policies as their parent notes

## Deploy to Vercel

This app is optimized for Vercel deployment:

1. Push your code to a Git repository
2. Import the project in Vercel
3. Configure environment variables:
   - Neon Data API credentials
   - Neon Auth credentials
4. Deploy!

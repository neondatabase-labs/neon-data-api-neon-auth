# note.

This project demonstrates how to build a modern note-taking application using Neon's Data API (powered by PostgREST), and Neon Auth for authentication. Instead of using traditional database access via a backend, this demo showcases how to leverage Neon's Data API for direct-to-database queries with a very elegant JS SDK.

**Neon Data API (PostgREST-compatible)**

- Instant REST API for your Postgres database
- Built-in filtering, pagination, and relationships
- Automatic OpenAPI documentation

This demo is built with:

- [Neon](https://neon.tech)
- [Neon Auth](https://neon.tech/docs/guides/neon-auth)
- Neon Data API (Postgrest-compatible)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Bun](https://bun.sh/) (v1.0 or newer)
- A [Neon](https://neon.tech) account and project, with [Auth enabled](https://neon.tech/docs/guides/neon-auth)

## Getting Started

Follow these steps to run the demo:

1. Create a Neon project and enable the Data API
2. Copy the Data API URL and the Neon Auth variables
3. Install the dependencies:

   ```bash
   bun install
   ```

4. **Configure Environment Variables:**
   Create a `.env` file in the project root with the following variables. Get them from the Neon console.

   ```env
   # Neon Data API
   VITE_NEON_DATA_API_URL=your_neon_data_api_url

   # Neon Auth
   VITE_PUBLIC_STACK_PROJECT_ID=your_project_id
   VITE_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=your_client_key
   ```

   Optionally, you can configure a `DATABASE_URL` environment variable and run `bun run db:migrate` to migrate your database.

5. **Start the Development Server:**

   ```bash
   bun dev
   ```

6. **Build for Production:**
   ```bash
   bun run build
   ```

## Database Setup

1. Create a Neon project and enable Data API:

   ```bash
   bun run db:generate
   ```

2. Apply the schema:

   ```bash
   bun run db:migrate
   ```

## Deployment

This application is configured for deployment on Vercel:

1. Push your code to a Git repository
2. Import the project in Vercel
3. Configure environment variables:
   - Neon Data API credentials
   - Neon Auth credentials
4. Deploy!

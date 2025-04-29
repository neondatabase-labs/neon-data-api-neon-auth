# note.

This project demonstrates how to build a modern note-taking application using Neon Data API (powered by PostgREST) and Stack Auth for authentication. Instead of using traditional database access patterns, this demo showcases how to leverage Neon's Data API for efficient, secure data access while using Stack Auth for authentication.

### **Why Neon Data API and Stack Auth?**

The combination of Neon Data API and Stack Auth provides a powerful, modern stack for building web applications:

**Neon Data API (PostgREST):**

- Instant REST API for your Postgres database
- Built-in filtering, pagination, and relationships
- Automatic OpenAPI documentation
- Row-level security out of the box

This demo is built with:

- [Neon](https://neon.tech)
- [Stack Auth](https://stackframe.dev/) - Modern Authentication for React

## Prerequisites

Before you begin, ensure you have the following installed:

- [Bun](https://bun.sh/) (v1.0 or newer)
- A [Neon](https://neon.tech) account and project
- A Stack Auth account and project

## Getting Started

Follow these steps to run the demo:

1. Create a Neon project and enable the Data API

2. Copy the Data API URL and the Stack Auth variables

3. Install the dependencies:

   ```bash
   bun install
   ```

4. **Configure Environment Variables:**
   Create a `.env` file in the project root with the following variables:

   ```env
   # Neon Data API
   VITE_NEON_DATA_API_URL=your_neon_data_api_url

   # Stack Auth
   VITE_PUBLIC_STACK_PROJECT_ID=your_project_id
   VITE_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=your_client_key
   ```

   Optionally you can configure a `DATABASE_URL` environment variable and run `bun run db:migrate` to migrate your database.

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
   - Stack Auth credentials
4. Deploy!

## Learn More

- [Neon Data API Documentation](https://neon.tech/docs/data-api)
- [PostgREST Documentation](https://postgrest.org/en/stable/)
- [Stack Auth Documentation](https://docs.stack-auth.com/next/overview)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

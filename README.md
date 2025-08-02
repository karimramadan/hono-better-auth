# Better Auth with Hono, Drizzle, and Postgres

An implementation of [Better Auth](https://www.better-auth.com) using a Hono backend, Postgres, and Drizzle ORM. Starts with email and password authentication and includes protected routes for managing posts.

## Features

- Email & password authentication
- Hono backend
- PostgreSQL + Drizzle ORM
- Protected `posts` routes
- Minimal, extensible foundation for modern auth

## Tech Stack

- [Bun](https://bun.com/) – an all-in-one JavaScript runtime
- [Hono](https://hono.dev) – ultra-fast web framework
- [Drizzle ORM](https://orm.drizzle.team) – type-safe SQL
- [Better Auth](https://www.better-auth.com) – a comprehensive authentication framework for TypeScript
- PostgreSQL – relational database

## Getting Started

```sh
# Clone the repo
git clone https://github.com/karimramadan/hono-better-auth
cd hono-better-auth

# Install dependencies
bun install

# Create a local db using docker
bun run db:up

# Set up env
cp .env.example .env

# Run generate
bun run db:generate

# Run migrate
bun run db:migrate

# Start dev server
bun run dev
```

open http://localhost:3000

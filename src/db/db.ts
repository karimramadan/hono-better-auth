import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "@/db/schema";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10, // Adjust the max pool size as needed
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
});

export const db = drizzle(pool, {
  schema,
  casing: "snake_case", // Use snake_case for column names
  logger: true, // Enable logging for debugging
});

import { Hono } from "hono";
import { cors } from "hono/cors";
import { ACCEPTED } from "@/helpers/http-status-codes";

// Routes
import { authRoute } from "@/routes/auth";
import { postRoute } from "@/routes/post";

const app = new Hono();

app.use(
  "*", // enable cors for all routes
  cors({
    origin: process.env.ALLOWED_ORIGINS || "http://localhost:3000",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })
);

// Health check route
app.get("/health", (c) => {
  return c.text("Ok!", ACCEPTED);
});

// Register routes
app.route("/api/auth", authRoute);
app.route("/api/post", postRoute);

export default app;

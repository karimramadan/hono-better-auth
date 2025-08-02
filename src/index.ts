import { Hono } from "hono";
import { cors } from "hono/cors";
import { auth } from "@/lib/auth";

// Routes
import { post } from "@/routes/post";

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

app
  .on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw))
  .route("/api/post", post)
  .get("/", (c) => {
    return c.text("Hello Hono!");
  });

export default app;

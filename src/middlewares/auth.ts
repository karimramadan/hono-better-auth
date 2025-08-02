import { createMiddleware } from "hono/factory";
import { auth } from "@/lib/auth";
import { HonoEnv } from "@/types/hono";

export const authMiddleware = createMiddleware<HonoEnv>(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    // If no session is found, return an unauthorized response
    return c.json({ error: "Unauthorized" }, 401);
  }

  // Set user and session in the context for later use
  c.set("user", session.user);
  c.set("session", session.session);
  return next();
});

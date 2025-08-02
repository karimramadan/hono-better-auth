import { Hono } from "hono";
import { auth } from "@/lib/auth";

export const authRoute = new Hono();

authRoute.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

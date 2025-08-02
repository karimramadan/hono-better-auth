import { Hono } from "hono";
import { authMiddleware } from "@/middlewares/auth";
import { getPostsByUserId, createPost } from "@/services/posts";
import type { HonoEnv } from "@/types/hono";
import { createPostValidator } from "@/validators/create-post.validator";
import { INTERNAL_SERVER_ERROR, CREATED } from "@/helpers/http-status-codes";

export const postRoute = new Hono<HonoEnv>();

postRoute.use(authMiddleware);

postRoute.get("/", async (c) => {
  const user = c.get("user");

  try {
    const postList = await getPostsByUserId(user.id);
    return c.json(postList);
  } catch (error) {
    console.error("Error fetching posts: ", error);
    return c.json({ error: "Failed to fetch posts" }, INTERNAL_SERVER_ERROR);
  }
});

postRoute.post("/", createPostValidator, async (c) => {
  const user = c.get("user");
  const postData = c.req.valid("json");

  try {
    const newPost = await createPost({
      ...postData,
      userId: user.id,
    });
    return c.json(newPost, CREATED);
  } catch (error) {
    console.error("Error creating post: ", error);
    return c.json({ error: "Failed to create post" }, INTERNAL_SERVER_ERROR);
  }
});

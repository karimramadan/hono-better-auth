import { Hono } from "hono";
import { authMiddleware } from "@/middlewares/auth";
import { getPostsByUserId, createPost } from "@/services/posts";
import type { HonoEnv } from "@/types/hono";
import { createPostValidator } from "@/validators/create-post.validator";

export const post = new Hono<HonoEnv>();

post.use(authMiddleware);

post.get("/", async (c) => {
  const user = c.get("user");

  try {
    const postList = await getPostsByUserId(user.id);
    return c.json(postList);
  } catch (error) {
    console.error("Error fetching posts: ", error);
    return c.json({ error: "Failed to fetch posts" }, 500);
  }
});

post.post("/", createPostValidator, async (c) => {
  const user = c.get("user");
  const postData = c.req.valid("json");

  try {
    const newPost = await createPost({
      ...postData,
      userId: user.id,
    });
    return c.json(newPost, 201);
  } catch (error) {
    console.error("Error creating post: ", error);
    return c.json({ error: "Failed to create post" }, 500);
  }
});

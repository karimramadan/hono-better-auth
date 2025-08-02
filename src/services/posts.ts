import { desc, eq } from "drizzle-orm";
import { db } from "@/db/db";
import { NewPost } from "@/types/posts";
import { post } from "@/db/schema";

export const createPost = async (newPost: NewPost) => {
  const [result] = await db.insert(post).values(newPost).returning();

  return result;
};

export const getPostsByUserId = async (userId: string) => {
  const posts = await db
    .select()
    .from(post)
    .where(eq(post.userId, userId))
    .orderBy(desc(post.createdAt));

  return posts;
};

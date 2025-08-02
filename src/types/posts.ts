import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type { post } from "@/db/schema";

export type Post = InferSelectModel<typeof post>;
export type NewPost = InferInsertModel<typeof post>;

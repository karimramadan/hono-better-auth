import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { BAD_REQUEST } from "@/helpers/http-status-codes";

export const createPostSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
  })
  .strict();

export const createPostValidator = zValidator(
  "json",
  createPostSchema,
  (result, c) => {
    if (!result.success) {
      return c.json(
        {
          errors: result.error.issues.map((issue) => issue.message),
        },
        BAD_REQUEST
      );
    }
  }
);

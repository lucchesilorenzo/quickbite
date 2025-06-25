import { z } from "zod/v4";

export const reviewForm = z.object({
  comment: z.string().trim().max(200, "Comment is too long."),
  rating: z
    .number()
    .min(1, "Rating is required.")
    .max(5, "Rating must be between 1 and 5."),
});

export type TReviewForm = z.infer<typeof reviewForm>;

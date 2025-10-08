import z from "zod";

export const reviewFormSchema = z.object({
  comment: z.string().trim().max(200, "Comment is too long."),
  rating: z.coerce
    .number()
    .min(1, "Rating is required.")
    .max(5, "Rating must be between 1 and 5."),
});

export type TReviewFormSchema = z.infer<typeof reviewFormSchema>;

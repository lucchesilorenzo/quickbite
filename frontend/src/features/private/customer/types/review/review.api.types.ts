import { TAddReviewFormSchema } from "../../schemas/review.schema";

import { ApiResponse } from "@/types/api.types";
import { Review } from "@/types/review/review.types";

export type CreateReviewResponse = {
  review: Omit<Review, "customer" | "order">;
} & ApiResponse;

export type CreateReviewPayload = TAddReviewFormSchema & { order_id: string };

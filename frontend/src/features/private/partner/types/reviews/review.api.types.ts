import { ApiResponse } from "@/types/api.types";
import { ReviewsWithPagination } from "@/types/reviews/review.types";

export type GetReviewsResponse = {
  reviews: ReviewsWithPagination;
  avg_rating: number | null;
  count: number;
} & ApiResponse;

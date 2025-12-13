import { ApiResponse } from "../api.types";
import { ReviewsWithPagination } from "./review.types";

export type GetReviewsResponse = {
  reviews: ReviewsWithPagination;
  avg_rating: number | null;
  count: number;
} & ApiResponse;

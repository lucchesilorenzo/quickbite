import { Order } from "./order-types";
import { User } from "./user-types";

export type Review = {
  id: string;
  user_id: string;
  restaurant_id: string;
  order_id: string;
  comment?: string;
  rating: number;
  created_at: string;
  updated_at: string;
  customer: User;
  order: Order;
};

// === PARTNER ===

export type PartnerReview = {
  current_page: number;
  data: Review[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
};

export type PartnerReviewWithPagination = {
  reviews: PartnerReview;
  avg_rating: number | null;
  count: number;
};

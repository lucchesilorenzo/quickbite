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
  reviews: Review[];
  avg_rating: number | null;
  count: number;
};

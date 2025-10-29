import { Order } from "@private/types/order-types";

import { BaseOffsetPagination } from "./pagination-types";
import { UserWithoutNotificationsAndRoles } from "./user-types";

export type Review = {
  id: string;
  user_id: string;
  restaurant_id: string;
  order_id: string;
  comment?: string;
  rating: number;
  created_at: string;
  updated_at: string;
  customer: UserWithoutNotificationsAndRoles;
  order: Order;
};

export type ReviewWithoutOrder = Omit<Review, "order">;

export type ReviewWithPagination = BaseOffsetPagination & {
  data: Review[];
};

export type ReviewStats = {
  reviews: ReviewWithPagination;
  avg_rating: number | null;
  count: number;
};

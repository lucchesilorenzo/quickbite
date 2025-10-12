import { BaseOffsetPagination } from "@/types/pagination-types";
import { RestaurantBase } from "@/types/restaurant-types";
import { Review } from "@/types/review-types";

export type Order = {
  id: string;
  restaurant: RestaurantBase & {
    reviews: Review[];
  };
  user_id: string | null;
  restaurant_id: string;
  order_code: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  street_address: string;
  building_number: string;
  postcode: string;
  city: string;
  state: string;
  country: string;
  delivery_time: string;
  notes: string | null;
  payment_method: string;
  order_items: OrderItem[];
  subtotal: number;
  delivery_fee: number;
  service_fee: number;
  discount_rate: number;
  discount: number;
  total: number;
  status: OrderStatus;
  created_at: string;
  updated_at: string;
};

export type OrderItem = {
  id: string;
  order_id: string;
  menu_item_id: string;
  name: string;
  quantity: number;
  item_total: number;
  created_at: string;
  updated_at: string;
};

export type OrderStatus =
  | "pending"
  | "accepted"
  | "rejected"
  | "preparing"
  | "delivering"
  | "delivered"
  | "cancelled";

export type OrderStatusWithAll = OrderStatus | "all";

export type OrderWithPagination = BaseOffsetPagination & {
  data: Order[];
};

import { BaseOffsetPagination } from "@/types/pagination.types";
import { BaseRestaurant } from "@/types/restaurants/restaurant.types";
import { ReviewWithoutOrder } from "@/types/reviews/review.types";

export type Order = {
  id: string;
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
  payment_method: PaymentMethod;
  payment_intent_id: string | null;
  payment_status: PaymentStatus;
  subtotal: number;
  delivery_fee: number;
  service_fee: number;
  discount_rate: number;
  discount: number;
  total: number;
  status: OrderStatus;
  created_at: string;
  updated_at: string;
  restaurant: BaseRestaurant & {
    reviews: ReviewWithoutOrder[];
  };
  order_items: OrderItem[];
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

export type PaymentMethod = "cash" | "online";

export type PaymentStatus = "pending" | "paid" | "failed";

export type OrderStatusWithAll = OrderStatus | "all";

export type OrdersWithPagination = BaseOffsetPagination & {
  data: Order[];
};

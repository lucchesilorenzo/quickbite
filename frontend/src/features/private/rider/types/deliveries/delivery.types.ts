import { Order, OrderStatus } from "../orders/order.types";

import { BaseOffsetPagination } from "@/types/pagination.types";

export type Delivery = {
  id: string;
  order_id: string;
  rider_id: string;
  rider_first_name: string;
  rider_last_name: string;
  rider_phone_number: string;
  started_at: string | null;
  delivered_at: string | null;
  cancelled_at: string | null;
  order: Order;
  created_at: string;
  updated_at: string;
};

export type DeliveriesWithPagination = BaseOffsetPagination & {
  data: Delivery[];
};

export type DeliveryStatus = Extract<
  OrderStatus,
  "delivering" | "delivered" | "cancelled"
>;

import { Order, OrderStatus } from "@private/shared/types/order.types";

export type PartnerOrder = Omit<Order, "restaurant"> & {
  restaurant: Omit<Order["restaurant"], "reviews">;
};

export type PartnerOrderStatus = Omit<OrderStatus, "pending" | "delivered">;

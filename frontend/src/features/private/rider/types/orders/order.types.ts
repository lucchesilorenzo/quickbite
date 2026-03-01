import {
  Order as TOrder,
  OrderStatus as TOrderStatus,
} from "@private/shared/types/order.types";

export type OrderStatus = Extract<
  TOrderStatus,
  "preparing" | "delivering" | "delivered" | "cancelled"
>;

export type Order = Omit<TOrder, "status" | "restaurant"> & {
  status: OrderStatus;
};

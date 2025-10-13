import { OrderStatus } from "@private/types/order-types";

export const statusTransitions: Record<OrderStatus, OrderStatus[]> = {
  pending: ["accepted", "rejected"],
  accepted: ["preparing"],
  rejected: [],
  preparing: [],
  delivering: [],
  delivered: [],
  cancelled: [],
};

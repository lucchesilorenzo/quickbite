import { OrderStatus } from "@/api/models";

export const statusTransitions: Record<OrderStatus, OrderStatus[]> = {
  pending: ["accepted", "rejected"],
  accepted: ["preparing"],
  rejected: [],
  preparing: [],
  delivering: [],
  delivered: [],
  cancelled: [],
};

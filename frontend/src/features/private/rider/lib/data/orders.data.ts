import { OrderStatus } from "@/api/models";

export const orderStatuses: Partial<
  Record<OrderStatus, { value: string; label: string }>
> = {
  preparing: { value: "delivering", label: "Start delivery" },
  delivering: { value: "delivered", label: "Flag as delivered" },
  delivered: { value: "", label: "Delivery has been completed" },
  cancelled: { value: "cancelled", label: "Delivery has been cancelled" },
};

export const statusTransitions: Partial<Record<OrderStatus, OrderStatus[]>> = {
  preparing: ["cancelled"],
  delivering: [],
  delivered: [],
  cancelled: [],
};

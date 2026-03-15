import { OrderStatus } from "../../types/orders/order.types";

export const orderStatuses = {
  preparing: { value: "delivering", label: "Start delivery" },
  delivering: { value: "delivered", label: "Flag as delivered" },
  delivered: { value: "", label: "Delivery has been completed" },
  cancelled: { value: "cancelled", label: "Delivery has been cancelled" },
};

export const statusTransitions: Record<OrderStatus, OrderStatus[]> = {
  preparing: ["cancelled"],
  delivering: [],
  delivered: [],
  cancelled: [],
};

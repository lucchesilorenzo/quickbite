import { OrderStatus } from "@/types";

export const orderStatuses = {
  pending: { value: "pending", label: "Pending", color: "default" },
  accepted: { value: "accepted", label: "Accepted", color: "success" },
  rejected: { value: "rejected", label: "Rejected", color: "error" },
  preparing: { value: "preparing", label: "Preparing", color: "default" },
  delivering: { value: "delivering", label: "Delivering", color: "primary" },
  delivered: { value: "delivered", label: "Delivered", color: "success" },
  cancelled: { value: "cancelled", label: "Cancelled", color: "error" },
} as const;

export const partnerStatusTransitions: Record<OrderStatus, OrderStatus[]> = {
  pending: ["accepted", "rejected"],
  accepted: ["preparing"],
  rejected: [],
  preparing: [],
  delivering: [],
  delivered: [],
  cancelled: [],
};

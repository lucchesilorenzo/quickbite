import { Chip } from "@mui/material";

import { Order } from "@/types/order-types";

const orderStatus = {
  pending: { label: "Pending", color: "default" },
  accepted: { label: "Accepted", color: "success" },
  rejected: { label: "Rejected", color: "error" },
  preparing: { label: "Preparing", color: "default" },
  delivering: { label: "Delivering", color: "primary" },
  delivered: { label: "Delivered", color: "success" },
  cancelled: { label: "Cancelled", color: "error" },
} as const;

type OrderStatusBadgeProps = {
  order: Order;
};

export default function OrderStatusBadge({ order }: OrderStatusBadgeProps) {
  return (
    <Chip
      label={orderStatus[order.status].label}
      color={orderStatus[order.status].color}
      size="small"
    />
  );
}

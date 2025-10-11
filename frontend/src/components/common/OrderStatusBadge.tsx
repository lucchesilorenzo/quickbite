import { Chip } from "@mui/material";

import { orderStatuses } from "@/lib/constants/orders";
import { Order, PartnerOrder } from "@/types/order-types";

type OrderStatusBadgeProps = {
  order: Order | PartnerOrder;
};

export default function OrderStatusBadge({ order }: OrderStatusBadgeProps) {
  return (
    <Chip
      label={orderStatuses[order.status].label}
      color={orderStatuses[order.status].color}
      size="small"
    />
  );
}

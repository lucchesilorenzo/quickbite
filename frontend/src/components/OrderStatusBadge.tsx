import { Chip } from "@mui/material";
import { PartnerOrder } from "@partner/types/order-types";
import { Order } from "@private/types/order-types";

import { orderStatuses } from "@/lib/constants/orders";

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

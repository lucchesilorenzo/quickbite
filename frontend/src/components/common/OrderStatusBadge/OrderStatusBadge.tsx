import { Chip } from "@mui/material";
import { OrderStatus } from "@private/shared/types/order.types";

import { orderStatuses } from "@/lib/data/orders.data";

type OrderStatusBadgeProps = {
  orderStatus: OrderStatus;
};

export default function OrderStatusBadge({
  orderStatus,
}: OrderStatusBadgeProps) {
  return (
    <Chip
      label={orderStatuses[orderStatus].label}
      color={orderStatuses[orderStatus].color}
      size="small"
    />
  );
}

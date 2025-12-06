import { Chip } from "@mui/material";

import { OrderStatus } from "@/features/private/shared/types/order.types";
import { orderStatuses } from "@/lib/constants/orders";

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

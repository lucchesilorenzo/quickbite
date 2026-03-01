import { OrderStatus } from "@private/shared/types/order.types";

import { orderStatuses } from "@/lib/constants/orders";

export function getDisabledOrderStatuses(
  currentStatus: OrderStatus,
  roleStatusTransitions: Record<OrderStatus, OrderStatus[]>,
) {
  return Object.keys(orderStatuses).filter(
    (s) => !roleStatusTransitions[currentStatus].includes(s as OrderStatus),
  );
}

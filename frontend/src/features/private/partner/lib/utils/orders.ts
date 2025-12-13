import { OrderStatus } from "@private/shared/types/order.types";

import { statusTransitions } from "../constants/orders";

import { orderStatuses } from "@/lib/constants/orders";

export function getDisabledOrderStatuses(currentStatus: OrderStatus) {
  return Object.keys(orderStatuses).filter(
    (s) => !statusTransitions[currentStatus].includes(s as OrderStatus),
  );
}

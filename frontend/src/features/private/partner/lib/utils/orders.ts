import { statusTransitions } from "../constants/orders";

import { orderStatuses } from "@/lib/constants/orders";
import { OrderStatus } from "@/types";

export function getDisabledOrderStatuses(currentStatus: OrderStatus) {
  return Object.keys(orderStatuses).filter(
    (s) => !statusTransitions[currentStatus].includes(s as OrderStatus),
  );
}

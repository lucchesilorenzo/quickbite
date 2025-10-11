import { orderStatuses, partnerStatusTransitions } from "../constants/orders";

import { OrderStatus } from "@/types";

export function getDisabledOrderStatuses(currentStatus: OrderStatus) {
  return Object.keys(orderStatuses).filter(
    (s) => !partnerStatusTransitions[currentStatus].includes(s as OrderStatus),
  );
}

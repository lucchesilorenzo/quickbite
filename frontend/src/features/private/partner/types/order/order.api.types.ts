import { PartnerOrderStatus } from "./order.types";

import {
  Order,
  OrdersWithPagination,
} from "@/features/private/shared/types/order.types";
import { ApiResponse } from "@/types/api.types";

export type GetOrdersResponse = OrdersWithPagination;

export type UpdateOrderStatusResponse = {
  order: Omit<Order, "restaurant" | "order_items">;
} & ApiResponse;

export type UpdateOrderStatusPayload = { status: PartnerOrderStatus };

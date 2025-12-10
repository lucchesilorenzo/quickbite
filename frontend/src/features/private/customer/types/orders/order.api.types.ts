import { Order, OrdersWithPagination } from "@private/shared/types/order.types";

import { CreateOrder } from "./order.types";

import { ApiResponse } from "@/types/api.types";

export type GetOrdersResponse = {
  orders: OrdersWithPagination;
} & ApiResponse;

export type GetOrderResponse = {
  order: Order;
} & ApiResponse;

export type CreateOrderResponse = GetOrderResponse;

export type CreateOrderPayload = CreateOrder;

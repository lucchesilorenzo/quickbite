import {
  Order,
  OrderItem,
  OrdersWithPagination,
} from "@private/types/order.types";

import { CreateOrder } from "./order.types";

import { ApiResponse } from "@/types/api.types";

export type GetOrdersResponse = OrdersWithPagination;

export type GetOrderResponse = Order;

export type CreateOrderResponse = {
  order: Order & {
    order_items: OrderItem[];
  };
} & ApiResponse;

export type CreateOrderPayload = CreateOrder;

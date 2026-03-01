import {
  DeliveriesWithPagination,
  Delivery,
  DeliveryStatus,
} from "./delivery.types";

import { ApiResponse } from "@/types/api.types";

export type GetDeliveriesResponse = {
  deliveries: DeliveriesWithPagination;
} & ApiResponse;

export type UpdateDeliveryStatusResponse = {
  delivery: Delivery;
} & ApiResponse;

export type UpdateDeliveryStatusPayload = {
  status: DeliveryStatus;
};

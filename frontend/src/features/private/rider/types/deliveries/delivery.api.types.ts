import { DeliveriesWithPagination } from "./delivery.types";

import { ApiResponse } from "@/types/api.types";

export type GetDeliveriesResponse = {
  deliveries: DeliveriesWithPagination;
} & ApiResponse;

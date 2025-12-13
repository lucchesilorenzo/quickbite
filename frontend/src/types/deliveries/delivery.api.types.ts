import { ApiResponse } from "../api.types";

export type GetDeliverySlotsResponse = {
  is_asap_available: boolean;
  delivery_slots: string[];
} & ApiResponse;

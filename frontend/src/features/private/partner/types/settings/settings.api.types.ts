import { TRestaurantSettingsFeesFormSchema } from "../../schemas/restaurant-settings.schema";
import { PartnerRestaurantDetail } from "../restaurant/restaurant.types";

import { ApiResponse } from "@/types/api.types";

export type UpdateDeliveryTimesResponse = {
  restaurant: PartnerRestaurantDetail;
} & ApiResponse;

export type UpdateDeliveryTimesPayload = {
  delivery_days: {
    day: string;
    start_time: string | null;
    end_time: string | null;
  }[];
};

export type UpdateFeesResponse = UpdateDeliveryTimesResponse;

export type UpdateFeesPayload = TRestaurantSettingsFeesFormSchema;

export type UpdateInfoResponse = UpdateDeliveryTimesResponse;

export type UpdateInfoPayload = FormData;

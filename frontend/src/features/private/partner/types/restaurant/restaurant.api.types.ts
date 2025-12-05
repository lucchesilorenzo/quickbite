import { PartnerRestaurantDetail } from "./restaurant.types";

import { ApiResponse } from "@/types/api.types";
import {
  BaseRestaurant,
  RestaurantDetail,
} from "@/types/restaurant/restaurant.types";

export type GetRestaurantResponse = PartnerRestaurantDetail;

export type GetRestaurantsResponse = BaseRestaurant[];

export type UpdateRestaurantApprovedStatusResponse = {
  restaurant: PartnerRestaurantDetail;
} & ApiResponse;

export type UpdateRestaurantStatusResponse =
  UpdateRestaurantApprovedStatusResponse;

export type UpdateRestaurantStatusPayload = {
  force_close: RestaurantDetail["force_close"];
};

import { PartnerRestaurantDetail } from "./restaurant.types";

import { ApiResponse } from "@/types/api.types";
import {
  BaseRestaurant,
  RestaurantDetail,
} from "@/types/restaurants/restaurant.types";

export type GetRestaurantsResponse = {
  restaurants: BaseRestaurant[];
} & ApiResponse;

export type GetRestaurantResponse = {
  restaurant: PartnerRestaurantDetail;
} & ApiResponse;

export type UpdateRestaurantApprovedStatusResponse = GetRestaurantResponse;

export type UpdateRestaurantStatusResponse =
  UpdateRestaurantApprovedStatusResponse;

export type UpdateRestaurantStatusPayload = {
  force_close: RestaurantDetail["force_close"];
};

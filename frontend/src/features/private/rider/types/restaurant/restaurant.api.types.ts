import { RestaurantWithPivot } from "./restaurant.types";

import { ApiResponse } from "@/types/api.types";

export type GetRestaurantResponse = {
  restaurant: RestaurantWithPivot | null;
} & ApiResponse;

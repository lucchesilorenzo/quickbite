import { ApiResponse } from "../api.types";
import { BaseCursorPagination } from "../pagination.types";
import {
  RestaurantListItem,
  RestaurantMeta,
  SingleRestaurantDetail,
} from "./restaurant.types";

export type GetBase64RestaurantLogoResponse = {
  logo: string;
} & ApiResponse;

export type GetRestaurantsResponse = {
  restaurants: BaseCursorPagination & {
    data: RestaurantListItem[];
  };
  meta: RestaurantMeta;
} & ApiResponse;

export type GetRestaurantResponse = {
  restaurant: SingleRestaurantDetail;
} & ApiResponse;

import { BaseCursorPagination } from "../pagination.types";
import {
  RestaurantListItem,
  RestaurantMeta,
  SingleRestaurantDetail,
} from "./restaurant.types";

export type GetBase64RestaurantLogoResponse = {
  logo: string;
};

export type GetRestaurantResponse = SingleRestaurantDetail;

export type GetRestaurantsResponse = {
  restaurants: BaseCursorPagination & {
    data: RestaurantListItem[];
  };
  meta: RestaurantMeta;
};

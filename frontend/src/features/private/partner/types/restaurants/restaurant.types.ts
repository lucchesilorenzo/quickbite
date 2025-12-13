import {
  BaseRestaurant,
  RestaurantDetail,
} from "@/types/restaurants/restaurant.types";

export type PartnerRestaurantDetail = BaseRestaurant &
  Omit<
    RestaurantDetail,
    | "offers"
    | "reviews"
    | "reviews_avg_rating"
    | "reviews_count"
    | "menu_categories"
  >;

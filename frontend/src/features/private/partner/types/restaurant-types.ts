import { RestaurantBase, RestaurantDetail } from "@/types/restaurant-types";

export type PartnerRestaurantDetail = RestaurantBase &
  Omit<
    RestaurantDetail,
    | "offers"
    | "reviews"
    | "reviews_avg_rating"
    | "reviews_count"
    | "menu_categories"
  >;

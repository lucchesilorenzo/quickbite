import { CategoryWithPivot } from "./category-types";
import { DeliveryDay } from "./delivery-types";
import { MenuCategory } from "./menu-types";
import { Offer } from "./offer-types";
import { BaseCursorPagination } from "./pagination-types";
import { Review } from "./review-types";

export type BaseRestaurant = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  street_address: string;
  building_number: string;
  postcode: string;
  city: string;
  state: string;
  country: string;
  full_address: string;
  latitude: number;
  longitude: number;
  phone_number: string;
  email: string;
  min_amount: number;
  delivery_fee: number;
  service_fee: number;
  min_delivery_time: number;
  max_delivery_time: number;
  logo: string | null;
  cover: string | null;
  is_approved: boolean;
  is_open: boolean;
  force_close: boolean;
  created_at: string;
  updated_at: string;
};

export type RestaurantListItem = BaseRestaurant & {
  reviews: Review[];
  reviews_avg_rating: number | null;
  reviews_count: number;
  categories: CategoryWithPivot[];
  delivery_days: DeliveryDay[];
  offers: Offer[];
  menu_categories: MenuCategory[];
};

export type RestaurantWithPagination = {
  restaurants: BaseCursorPagination & {
    data: RestaurantListItem[];
  };
  meta: RestaurantMeta;
};

export type RestaurantMeta = {
  total: number;
  mov_counts: {
    all: number;
    "1000": number;
    "1500": number;
  };
  offer_counts: {
    with_discounts: number;
  };
};

export type RestaurantDetail = RestaurantListItem & {
  menu_categories: MenuCategory[];
  created_at: string;
  updated_at: string;
};

export type SingleRestaurantDetail = BaseRestaurant &
  Omit<
    RestaurantDetail,
    | "reviews"
    | "reviews_avg_rating"
    | "reviews_count"
    | "offers"
    | "menu_categories"
  >;

export type RestaurantSearchOption = {
  id: string;
  label: string;
  type: string;
};

export type RestaurantTab = "reviews" | "info" | "offers";

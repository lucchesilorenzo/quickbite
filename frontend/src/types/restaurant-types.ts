import { CategoryWithPivot } from "./category-types";
import { DeliveryDay } from "./delivery-day-types";
import { MenuCategory } from "./menu-types";
import { Offer } from "./offer-types";
import { Review } from "./review-types";

export type RestaurantBase = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  street_address: string;
  building_number: string;
  road: string | null;
  neighbourhood: string | null;
  suburb: string | null;
  island: string | null;
  city: string | null;
  county: string | null;
  state: string | null;
  postcode: string;
  country: string;
  full_address: string;
  latitude: number;
  longitude: number;
  phone_number: string;
  email: string;
  vat_id: string | null;
  min_amount: number;
  delivery_fee: number;
  service_fee: number;
  delivery_time_min: number;
  delivery_time_max: number;
  logo: string | null;
  cover: string | null;
  is_approved: boolean;
  is_open: boolean;
  force_close: boolean;
  created_at: string;
  updated_at: string;
};

export type RestaurantListItem = RestaurantBase & {
  reviews: Review[];
  reviews_avg_rating: number | null;
  reviews_count: number;
  categories: CategoryWithPivot[];
  delivery_days: DeliveryDay[];
  offers: Offer[];
  menu_categories: MenuCategory[];
};

export type RestaurantDetail = RestaurantListItem & {
  menu_categories: MenuCategory[];
  created_at: string;
  updated_at: string;
};

export type RestaurantWithPagination = {
  restaurants: {
    data: RestaurantListItem[];
    path: string;
    per_page: number;
    next_cursor: string | null;
    next_page_url: string | null;
    prev_cursor: string | null;
    prev_page_url: string | null;
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

export type SingleRestaurantDetail = RestaurantBase &
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

// === PARTNER ===

export type PartnerRestaurantBase = RestaurantBase;

export type PartnerRestaurantDetail = PartnerRestaurantBase &
  Omit<
    RestaurantDetail,
    | "offers"
    | "reviews"
    | "reviews_avg_rating"
    | "reviews_count"
    | "menu_categories"
  >;

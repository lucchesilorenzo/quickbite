import { CategoryWithPivot } from "./category-types";
import { Review } from "./reviews-types";

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
  reviews_avg_rating: number | null;
  reviews_count: number;
  categories: CategoryWithPivot[];
  delivery_days: DeliveryDay[];
  offers: Offer[];
  menu_categories: MenuCategory[];
  reviews: Review[];
};

export type RestaurantDetail = RestaurantListItem & {
  menu_categories: MenuCategory[];
  created_at: string;
  updated_at: string;
};

export type DeliveryDay = {
  id: string;
  restaurant_id: string;
  day:
    | "MONDAY"
    | "TUESDAY"
    | "WEDNESDAY"
    | "THURSDAY"
    | "FRIDAY"
    | "SATURDAY"
    | "SUNDAY";
  start_time: string | null;
  end_time: string | null;
  created_at: string;
  updated_at: string;
};

export type Offer = {
  id: string;
  restaurant_id: string;
  discount_rate: number;
  min_discount_amount: number;
  created_at: string;
  updated_at: string;
};

export type MenuItem = {
  id: string;
  menu_category_id: string;
  name: string;
  description: string | null;
  price: number;
  image: string | null;
  is_available: boolean;
  created_at: string;
  updated_at: string;
};

export type MenuCategory = {
  id: string;
  restaurant_id: string;
  name: string;
  description: string | null;
  order: number;
  created_at: string;
  updated_at: string;
  menu_items: MenuItem[];
};

export type RestaurantSearchOption = {
  id: string;
  label: string;
  type: string;
};

export type RestaurantTab = "reviews" | "info" | "offers";

// Partner

export type PartnerRestaurantBase = RestaurantBase;

export type PartnerRestaurantDetail = PartnerRestaurantBase &
  Omit<RestaurantDetail, "offers" | "reviews">;

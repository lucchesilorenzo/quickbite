import { CategoryWithPivot } from "./category-types";
import { User } from "./user-types";

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
  shipping_cost: number;
  delivery_time_min: number;
  delivery_time_max: number;
  discount: number;
  min_discount_amount: number;
  logo: string;
  cover: string;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
};

export type RestaurantListItem = RestaurantBase & {
  reviews_avg_rating: number;
  reviews_count: number;
  categories: CategoryWithPivot[];
  delivery_days: DeliveryDay[];
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

export type Review = {
  id: string;
  restaurant_id: string;
  user_id: string;
  comment?: string;
  rating: number;
  created_at: string;
  updated_at: string;
  customer: User;
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

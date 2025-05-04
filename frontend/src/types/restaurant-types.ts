import { CategoryWithPivot } from "./category-types";

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
  logo: string;
  cover: string;
  discount: number;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
};

export type RestaurantListItem = RestaurantBase & {
  reviews_avg_rating: number;
  reviews_count: number;
  categories: CategoryWithPivot[];
  delivery_days: DeliveryDay[];
  reviews: Review[];
};

// export type RestaurantDetail = {};

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
  comment: string;
  rating: number;
  created_at: string;
  updated_at: string;
};

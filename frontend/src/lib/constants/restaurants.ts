import { RestaurantBase, RestaurantTab } from "@/types/restaurant-types";

export const emptyRestaurant = {
  id: "",
  name: "",
  slug: "",
  description: null,
  street_address: "",
  building_number: "",
  postcode: "",
  city: "",
  state: "",
  country: "",
  full_address: "",
  latitude: 0,
  longitude: 0,
  phone_number: "",
  email: "",
  min_amount: 0,
  delivery_fee: 0,
  service_fee: 0,
  delivery_time_min: 0,
  delivery_time_max: 0,
  logo: "",
  cover: "",
  is_approved: false,
  is_open: false,
  force_close: false,
  created_at: "",
  updated_at: "",
} satisfies RestaurantBase;

export const restaurantTabs: RestaurantTab[] = ["info", "reviews", "offers"];

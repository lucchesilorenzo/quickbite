import { BaseRestaurant, RestaurantTab } from "@/types/restaurant.types";

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
  min_delivery_time: 0,
  max_delivery_time: 0,
  logo: "",
  cover: "",
  is_approved: false,
  is_open: false,
  force_close: false,
  created_at: "",
  updated_at: "",
} satisfies BaseRestaurant;

export const restaurantTabs: RestaurantTab[] = ["info", "reviews", "offers"];

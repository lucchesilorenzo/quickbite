import {
  GetBase64RestaurantLogoResponse,
  GetRestaurantResponse,
} from "@/types/restaurants/restaurant.api.types";
import { SingleRestaurantDetail } from "@/types/restaurants/restaurant.types";
import { category } from "@tests/mocks/data/public/categories";
import { deliveryDays } from "@tests/mocks/data/public/delivery-days";
import { apiResponse } from "../shared/common";

export const restaurant: SingleRestaurantDetail = {
  id: "a01c3a1f-5f95-45e7-8cc8-4c7bcda56d46",
  name: "Crooks Inc",
  slug: "crooks-inc-a01c3a1f-5f95-45e7-8cc8-4c7bcda56d46",
  description: "Qui dolores aut enim harum mollitia.",
  street_address: "Via Santa Maria",
  building_number: "2",
  postcode: "56126",
  city: "Pisa",
  state: "Tuscany",
  country: "Italy",
  latitude: 43.71676655,
  longitude: 10.396740158757053,
  phone_number: "+39 327 326 6326",
  email: "maryam.terry@example.com",
  min_amount: 10,
  delivery_fee: 2.99,
  service_fee: 0,
  min_delivery_time: 10,
  max_delivery_time: 25,
  logo: "/storage/restaurants/logos/C9ceZMIVUlml33WDsFZhdeaN1WoE4KZVeGwS4CQV.jpg",
  cover: "/storage/restaurants/covers/default/cover1.jpg",
  is_approved: true,
  force_close: false,
  created_at: "2025-10-14T08:35:46.000000Z",
  updated_at: "2025-10-15T16:35:55.000000Z",
  full_address: "Via Santa Maria 2, 56126 Pisa, Tuscany",
  is_open: false,
  categories: [category],
  delivery_days: deliveryDays,
};

export const restaurantData: GetRestaurantResponse = {
  ...apiResponse,
  restaurant,
};

export const restaurantLogoResponse: GetBase64RestaurantLogoResponse = {
  ...apiResponse,
  logo: "data:image/jpeg;mock",
};

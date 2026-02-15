import { GetRestaurantResponse } from "@rider/types/restaurant/restaurant.api.types";
import { RestaurantWithPivot } from "@rider/types/restaurant/restaurant.types";
import { apiResponse } from "../../shared/common";

export const restaurantWithPivot: RestaurantWithPivot = {
  id: "019c5907-c4e8-7370-b879-b94aef6e9a26",
  name: "Test",
  slug: "test-a112c708-eac1-46e8-a20b-d1ec0757ec9e",
  description: null,
  street_address: "Via Roma",
  building_number: "1",
  postcode: "00100",
  city: "Roma",
  state: "Lazio",
  country: "Italy",
  latitude: 41.5323913,
  longitude: 12.564768763058659,
  phone_number: "+39 373 782 7347",
  email: "testrestaurant@gmail.com",
  min_amount: 0,
  delivery_fee: 0,
  service_fee: 0,
  min_delivery_time: 1,
  max_delivery_time: 10,
  logo: "restaurants/logos/oQmFOtDL1cCxBNmDJiNwnWTMU8qQCBqE0ICnZnww.jpg",
  cover: "restaurants/covers/bmvKAxbagBgJYz9FwAv2ELHWNC0ANhBsrYIDcaqC.webp",
  is_approved: true,
  force_close: false,
  created_at: "2026-02-13T22:03:27.000000Z",
  updated_at: "2026-02-13T22:22:32.000000Z",
  full_address: "Via Roma 1, 00100 Roma, Lazio",
  is_open: false,
  logo_url:
    "http://localhost:8000/storage/restaurants/logos/oQmFOtDL1cCxBNmDJiNwnWTMU8qQCBqE0ICnZnww.jpg",
  cover_url:
    "http://localhost:8000/storage/restaurants/covers/bmvKAxbagBgJYz9FwAv2ELHWNC0ANhBsrYIDcaqC.webp",
  pivot: {
    user_id: "019c593b-c52c-717b-8af3-954a98775823",
    restaurant_id: "019c5907-c4e8-7370-b879-b94aef6e9a26",
    role: "rider",
    is_active: true,
  },
};

export const restaurantResponse: GetRestaurantResponse = {
  ...apiResponse,
  restaurant: restaurantWithPivot,
};

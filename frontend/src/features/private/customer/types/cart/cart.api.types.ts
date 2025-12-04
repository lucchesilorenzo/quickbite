import { ApiResponse } from "@/types/api.types";
import { RestaurantCart } from "@/types/cart.types";

export type GetCartResponse = RestaurantCart;

export type GetCartsResponse = RestaurantCart[];

export type CreateOrUpdateCartResponse = {
  data: Omit<RestaurantCart, "id"> & { id: string };
} & ApiResponse;

export type CreateOrUpdateCartPayload = GetCartResponse;

export type CreateOrUpdateCartsResponse = {
  data: Array<Omit<RestaurantCart, "id"> & { id: string }>;
} & ApiResponse;

export type CreateOrUpdateCartsPayload = GetCartsResponse;

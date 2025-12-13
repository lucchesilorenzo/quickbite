import { ApiResponse } from "@/types/api.types";
import { RestaurantCart } from "@/types/cart.types";

export type GetCartsResponse = {
  carts: Required<RestaurantCart[]>;
} & ApiResponse;

export type GetCartResponse = {
  cart: Required<RestaurantCart>;
} & ApiResponse;

export type CreateOrUpdateCartsResponse = GetCartsResponse;

export type CreateOrUpdateCartsPayload = RestaurantCart[];

export type CreateOrUpdateCartResponse = GetCartResponse;

export type CreateOrUpdateCartPayload = RestaurantCart;

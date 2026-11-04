import type { CartResource } from "@/api/models";

export type RestaurantCart = Omit<CartResource, "id"> & {
  id?: string;
};

export type Cart = Record<string, RestaurantCart>;

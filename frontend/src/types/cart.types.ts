import type { CartResource } from "@/api/backend/models";

export type RestaurantCart = Omit<CartResource, "id"> & {
  id?: string;
};

export type Cart = Record<string, RestaurantCart>;

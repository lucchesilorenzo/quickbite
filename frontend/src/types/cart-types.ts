import { MenuItem } from "./menu-types";
import { RestaurantBase } from "./restaurant-types";

export type CartItem = Omit<MenuItem, "order"> & {
  quantity: number;
  item_total: number;
};

export type RestaurantCart = {
  id?: string;
  restaurant: RestaurantBase;
  items: CartItem[];
  total_items: number;
  total_unique_items: number;
  cart_total: number;
};

export type Cart = {
  [restaurantId: string]: RestaurantCart;
};

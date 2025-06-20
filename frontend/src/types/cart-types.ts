import { MenuItem } from "./restaurant-types";

export type CartItem = MenuItem & {
  quantity: number;
  item_total: number;
};

export type RestaurantCart = {
  items: CartItem[];
  total_items: number;
  total_unique_items: number;
  cart_total: number;
};

export type Cart = {
  [restaurantId: string]: RestaurantCart;
};

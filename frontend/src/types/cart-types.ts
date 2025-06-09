import { MenuItem } from "./restaurant-types";

export type CartItem = MenuItem & {
  quantity: number;
  item_total: number;
};

export type RestaurantCart = {
  items: CartItem[];
  totalItems: number;
  totalUniqueItems: number;
  cartTotal: number;
};

export type Cart = {
  [restaurantId: string]: RestaurantCart;
};

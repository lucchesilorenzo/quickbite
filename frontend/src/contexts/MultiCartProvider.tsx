import { createContext, useEffect, useState } from "react";

import { MenuItem } from "@/types";
import { Cart, CartItem, RestaurantCart } from "@/types/cart-types";

type MultiCartProviderProps = {
  children: React.ReactNode;
};

type MultiCartContext = {
  isEmpty: (restaurantId: string) => boolean;
  addItem: (restaurantId: string, menuItem: MenuItem, quantity: number) => void;
  getItem: (restaurantId: string, cartItemId: string) => CartItem | undefined;
  inCart: (restaurantId: string, cartItemId: string) => boolean;
};

const initialState: RestaurantCart = {
  items: [],
  totalItems: 0,
  totalUniqueItems: 0,
  cartTotal: 0,
};

export const MultiCartContext = createContext<MultiCartContext | null>(null);

export default function MultiCartProvider({
  children,
}: MultiCartProviderProps) {
  const [carts, setCarts] = useState<Cart>(() => {
    const stored = localStorage.getItem("carts");
    return stored ? JSON.parse(stored) : {};
  });

  useEffect(() => {
    localStorage.setItem("carts", JSON.stringify(carts));
  }, [carts]);

  function isEmpty(restaurantId: string) {
    return !carts[restaurantId] || carts[restaurantId].items.length === 0;
  }

  function addItem(restaurantId: string, menuItem: MenuItem, quantity: number) {
    setCarts((prev) => {
      const existingCart = prev[restaurantId] ?? initialState;

      const existingItem = existingCart.items.some(
        (item) => item.id === menuItem.id,
      );

      const updatedItems = existingItem
        ? existingCart.items.map((item) =>
            item.id === menuItem.id
              ? {
                  ...item,
                  quantity: item.quantity + quantity,
                  item_total: Number(
                    ((item.quantity + quantity) * item.price).toFixed(2),
                  ),
                }
              : item,
          )
        : [
            ...existingCart.items,
            {
              ...menuItem,
              quantity,
              item_total: Number((quantity * menuItem.price).toFixed(2)),
            },
          ];

      const totalItems = updatedItems.reduce(
        (acc, curr) => acc + curr.quantity,
        0,
      );

      const cartTotal = updatedItems.reduce(
        (acc, curr) => acc + curr.item_total,
        0,
      );

      const totalUniqueItems = updatedItems.length;

      return {
        ...prev,
        [restaurantId]: {
          items: updatedItems,
          totalItems,
          totalUniqueItems,
          cartTotal: Number(cartTotal.toFixed(2)),
        },
      };
    });
  }

  function getItem(restaurantId: string, cartItemId: string) {
    return carts[restaurantId]?.items.find((item) => item.id === cartItemId);
  }

  function inCart(restaurantId: string, cartItemId: string) {
    return !!getItem(restaurantId, cartItemId);
  }

  return (
    <MultiCartContext.Provider value={{ isEmpty, addItem, getItem, inCart }}>
      {children}
    </MultiCartContext.Provider>
  );
}

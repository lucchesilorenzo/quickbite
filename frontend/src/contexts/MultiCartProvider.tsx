import { createContext, useEffect, useState } from "react";

import { MenuItem } from "@/types";
import { Cart, CartItem, RestaurantCart } from "@/types/cart-types";

type MultiCartProviderProps = {
  children: React.ReactNode;
};

type MultiCartContext = {
  getCart: (restaurantId: string) => RestaurantCart;
  getItems: (restaurantId: string) => CartItem[];
  isEmpty: (restaurantId: string) => boolean;
  addItem: (restaurantId: string, menuItem: MenuItem, quantity: number) => void;
  getItem: (restaurantId: string, cartItemId: string) => CartItem | undefined;
  inCart: (restaurantId: string, cartItemId: string) => boolean;
  emptyCart: (restaurantId: string) => void;
  totalItems: (restaurantId: string) => number;
  totalUniqueItems: (restaurantId: string) => number;
  removeItem: (restaurantId: string, cartItemId: string) => void;
  incrementItemQuantity: (
    restaurantId: string,
    cartItemId: string,
    quantity?: number,
  ) => void;
  decrementItemQuantity: (
    restaurantId: string,
    cartItemId: string,
    quantity?: number,
  ) => void;
  cartTotal: (restaurantId: string) => number;
  emptyAllCarts: () => void;
};

const initialState: RestaurantCart = {
  items: [],
  restaurant_id: "",
  total_items: 0,
  total_unique_items: 0,
  cart_total: 0,
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

  // Helper function to calculate cart totals
  function calculateCartTotals(items: CartItem[]) {
    const total_items = items.reduce((acc, curr) => acc + curr.quantity, 0);

    const cart_total = Number(
      items.reduce((acc, curr) => acc + curr.item_total, 0).toFixed(2),
    );

    const total_unique_items = items.length;

    return { total_items, total_unique_items, cart_total };
  }

  function getCart(restaurantId: string) {
    return carts[restaurantId];
  }

  function getItems(restaurantId: string) {
    return carts[restaurantId]?.items ?? [];
  }

  function getItem(restaurantId: string, cartItemId: string) {
    return carts[restaurantId]?.items.find((item) => item.id === cartItemId);
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

      const { total_items, total_unique_items, cart_total } =
        calculateCartTotals(updatedItems);

      return {
        ...prev,
        [restaurantId]: {
          restaurant_id: restaurantId,
          items: updatedItems,
          total_items,
          total_unique_items,
          cart_total: Number(cart_total.toFixed(2)),
        },
      };
    });
  }

  function removeItem(restaurantId: string, cartItemId: string) {
    setCarts((prev) => {
      const cart = prev[restaurantId];

      const updatedItems = cart.items.filter((item) => item.id !== cartItemId);

      const { total_items, total_unique_items, cart_total } =
        calculateCartTotals(updatedItems);

      return {
        ...prev,
        [restaurantId]: {
          ...cart,
          restaurant_id: restaurantId,
          items: updatedItems,
          total_items,
          total_unique_items,
          cart_total: Number(cart_total.toFixed(2)),
        },
      };
    });
  }

  function incrementItemQuantity(
    restaurantId: string,
    cartItemId: string,
    quantity: number = 1,
  ) {
    setCarts((prev) => {
      const cart = prev[restaurantId];

      const updatedItems = cart.items.map((item) =>
        item.id === cartItemId
          ? {
              ...item,
              quantity: item.quantity + quantity,
              item_total: Number(
                ((item.quantity + quantity) * item.price).toFixed(2),
              ),
            }
          : item,
      );

      const { total_items, total_unique_items, cart_total } =
        calculateCartTotals(updatedItems);

      return {
        ...prev,
        [restaurantId]: {
          ...cart,
          items: updatedItems,
          total_items,
          total_unique_items,
          cart_total: Number(cart_total.toFixed(2)),
        },
      };
    });
  }

  function decrementItemQuantity(
    restaurantId: string,
    cartItemId: string,
    quantity: number = 1,
  ) {
    setCarts((prev) => {
      const cart = prev[restaurantId];

      const updatedItems = cart.items
        .map((item) =>
          item.id === cartItemId
            ? {
                ...item,
                quantity: item.quantity - quantity,
                item_total: Number(
                  ((item.quantity - quantity) * item.price).toFixed(2),
                ),
              }
            : item,
        )
        .filter((item) => item.quantity > 0);

      const { total_items, total_unique_items, cart_total } =
        calculateCartTotals(updatedItems);

      return {
        ...prev,
        [restaurantId]: {
          ...cart,
          items: updatedItems,
          total_items,
          total_unique_items,
          cart_total: Number(cart_total.toFixed(2)),
        },
      };
    });
  }

  function inCart(restaurantId: string, cartItemId: string) {
    return !!getItem(restaurantId, cartItemId);
  }

  function emptyCart(restaurantId: string) {
    setCarts((prev) => {
      const updatedCarts = { ...prev };

      delete updatedCarts[restaurantId];
      return updatedCarts;
    });
  }

  function totalItems(restaurantId: string) {
    return getItems(restaurantId).reduce((acc, curr) => acc + curr.quantity, 0);
  }

  function totalUniqueItems(restaurantId: string) {
    return getItems(restaurantId).length;
  }

  function cartTotal(restaurantId: string) {
    return carts[restaurantId]?.cart_total;
  }

  function isEmpty(restaurantId: string) {
    return !carts[restaurantId] || carts[restaurantId].items.length === 0;
  }

  function emptyAllCarts() {
    setCarts({});
  }

  return (
    <MultiCartContext.Provider
      value={{
        getCart,
        getItems,
        isEmpty,
        addItem,
        getItem,
        inCart,
        emptyCart,
        totalItems,
        totalUniqueItems,
        removeItem,
        incrementItemQuantity,
        decrementItemQuantity,
        cartTotal,
        emptyAllCarts,
      }}
    >
      {children}
    </MultiCartContext.Provider>
  );
}

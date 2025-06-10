import { createContext, useEffect, useState } from "react";

import { MenuItem } from "@/types";
import { Cart, CartItem, RestaurantCart } from "@/types/cart-types";

type MultiCartProviderProps = {
  children: React.ReactNode;
};

type MultiCartContext = {
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

  // Helper function to calculate cart totals
  function calculateCartTotals(items: CartItem[]) {
    const totalItems = items.reduce((acc, curr) => acc + curr.quantity, 0);

    const cartTotal = Number(
      items.reduce((acc, curr) => acc + curr.item_total, 0).toFixed(2),
    );

    const totalUniqueItems = items.length;

    return { totalItems, totalUniqueItems, cartTotal };
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

      const { totalItems, totalUniqueItems, cartTotal } =
        calculateCartTotals(updatedItems);

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

  function removeItem(restaurantId: string, cartItemId: string) {
    setCarts((prev) => {
      const cart = prev[restaurantId];

      const updatedItems = cart.items.filter((item) => item.id !== cartItemId);

      const { totalItems, totalUniqueItems, cartTotal } =
        calculateCartTotals(updatedItems);

      return {
        ...prev,
        [restaurantId]: {
          ...cart,
          items: updatedItems,
          totalItems,
          totalUniqueItems,
          cartTotal: Number(cartTotal.toFixed(2)),
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

      const { totalItems, totalUniqueItems, cartTotal } =
        calculateCartTotals(updatedItems);

      return {
        ...prev,
        [restaurantId]: {
          ...cart,
          items: updatedItems,
          totalItems,
          totalUniqueItems,
          cartTotal: Number(cartTotal.toFixed(2)),
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

      const { totalItems, totalUniqueItems, cartTotal } =
        calculateCartTotals(updatedItems);

      return {
        ...prev,
        [restaurantId]: {
          ...cart,
          items: updatedItems,
          totalItems,
          totalUniqueItems,
          cartTotal: Number(cartTotal.toFixed(2)),
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
    return carts[restaurantId]?.cartTotal;
  }

  function isEmpty(restaurantId: string) {
    return !carts[restaurantId] || carts[restaurantId].items.length === 0;
  }

  return (
    <MultiCartContext.Provider
      value={{
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
      }}
    >
      {children}
    </MultiCartContext.Provider>
  );
}

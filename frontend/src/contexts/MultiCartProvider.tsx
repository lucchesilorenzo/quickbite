import { createContext, useContext, useEffect, useRef, useState } from "react";

import { useCreateOrUpdateCart } from "@customer/hooks/carts/useCreateOrUpdateCart";
import { useGetCarts } from "@customer/hooks/carts/useGetCarts";

import { useAuth } from "./AuthProvider";

import { emptyRestaurant } from "@/lib/constants/restaurants";
import { isCustomer } from "@/lib/utils/auth";
import { addRestaurantIdAsKey } from "@/lib/utils/restaurants";
import { Cart, CartItem, RestaurantCart } from "@/types/cart.types";
import { MenuItem } from "@/types/menu/menu.types";
import { SingleRestaurantDetail } from "@/types/restaurant/restaurant.types";

type MultiCartProviderProps = {
  children: React.ReactNode;
};

type MultiCartContext = {
  isCartUpdating: boolean;
  getCarts: () => RestaurantCart[];
  getCart: (restaurantId: string) => RestaurantCart;
  getItems: (restaurantId: string) => CartItem[];
  isEmpty: (restaurantId: string) => boolean;
  addItem: (
    restaurant: SingleRestaurantDetail,
    menuItem: MenuItem | CartItem,
    quantity: number,
  ) => void;
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
  emptyCarts: () => void;
};

const initialState: RestaurantCart = {
  items: [],
  restaurant: emptyRestaurant,
  total_items: 0,
  total_unique_items: 0,
  cart_total: 0,
};

const MultiCartContext = createContext<MultiCartContext | null>(null);

export default function MultiCartProvider({
  children,
}: MultiCartProviderProps) {
  const { user } = useAuth();

  const { data: updatedCarts = [] } = useGetCarts(isCustomer(user));
  const { mutateAsync: createOrUpdateCart, isPending: isCartUpdating } =
    useCreateOrUpdateCart();

  const [carts, setCarts] = useState<Cart>(() => {
    if (!isCustomer(user)) {
      const stored = localStorage.getItem("carts");
      return stored ? JSON.parse(stored) : {};
    }

    return {};
  });

  const inizialized = useRef(false);

  useEffect(() => {
    if (!isCustomer(user)) return;

    const cartsWithRestaurantKey = addRestaurantIdAsKey(updatedCarts);

    setCarts((prev) => {
      const prevString = JSON.stringify(prev);
      const nextString = JSON.stringify(cartsWithRestaurantKey);

      if (prevString === nextString) return prev;

      inizialized.current = true;

      return cartsWithRestaurantKey;
    });
  }, [user, updatedCarts]);

  useEffect(() => {
    if (user === null) {
      localStorage.setItem("carts", JSON.stringify(carts));
    }
  }, [user, carts]);

  // Helper function to calculate cart totals
  function calculateCartTotals(items: CartItem[]) {
    const total_items = items.reduce((acc, curr) => acc + curr.quantity, 0);

    const cart_total = Number(
      items.reduce((acc, curr) => acc + curr.item_total, 0).toFixed(2),
    );

    const total_unique_items = items.length;

    return { total_items, total_unique_items, cart_total };
  }

  function getCarts() {
    return Object.values(carts);
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

  async function addItem(
    restaurant: SingleRestaurantDetail,
    menuItem: MenuItem | CartItem,
    quantity: number,
  ) {
    let updatedCart: RestaurantCart | null = null;

    setCarts((prev) => {
      const { id: restaurantId } = restaurant;

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

      updatedCart = {
        ...existingCart,
        restaurant,
        items: updatedItems,
        total_items,
        total_unique_items,
        cart_total: Number(cart_total.toFixed(2)),
      };

      return {
        ...prev,
        [restaurantId]: updatedCart,
      };
    });

    if (isCustomer(user) && updatedCart) {
      await createOrUpdateCart(updatedCart);
    }
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
          items: updatedItems,
          total_items,
          total_unique_items,
          cart_total: Number(cart_total.toFixed(2)),
        },
      };
    });
  }

  async function incrementItemQuantity(
    restaurantId: string,
    cartItemId: string,
    quantity: number = 1,
  ) {
    let updatedCart: RestaurantCart | null = null;

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

      updatedCart = {
        ...cart,
        items: updatedItems,
        total_items,
        total_unique_items,
        cart_total: Number(cart_total.toFixed(2)),
      };

      return {
        ...prev,
        [restaurantId]: updatedCart,
      };
    });

    if (isCustomer(user) && updatedCart) {
      await createOrUpdateCart(updatedCart);
    }
  }

  async function decrementItemQuantity(
    restaurantId: string,
    cartItemId: string,
    quantity: number = 1,
  ) {
    let updatedCart: RestaurantCart | null = null;

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

      updatedCart = {
        ...cart,
        items: updatedItems,
        total_items,
        total_unique_items,
        cart_total: Number(cart_total.toFixed(2)),
      };

      return {
        ...prev,
        [restaurantId]: updatedCart,
      };
    });

    if (isCustomer(user) && updatedCart) {
      await createOrUpdateCart(updatedCart);
    }
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

  function emptyCarts() {
    setCarts({});
  }

  return (
    <MultiCartContext.Provider
      value={{
        isCartUpdating,
        getCarts,
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
        emptyCarts,
      }}
    >
      {children}
    </MultiCartContext.Provider>
  );
}

export function useMultiCart() {
  const context = useContext(MultiCartContext);

  if (!context) {
    throw new Error("useMultiCart must be used within a MultiCartProvider.");
  }

  return context;
}

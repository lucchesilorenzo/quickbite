import { createContext, useState } from "react";

import { useParams } from "react-router-dom";

import FullPageSpinner from "@/components/common/FullPageSpinner";
import { useGetCart } from "@/hooks/react-query/private/cart/useGetCart";
import { Cart } from "@/types";
import { Order } from "@/types/order-types";

type CheckoutProviderProps = {
  children: React.ReactNode;
};

type CheckoutContext = {
  cart: Cart;
  checkoutData: Partial<Order> | null;
  setCheckoutData: React.Dispatch<React.SetStateAction<Partial<Order> | null>>;
};

export const CheckoutContext = createContext<CheckoutContext | null>(null);

export default function CheckoutProvider({ children }: CheckoutProviderProps) {
  const [checkoutData, setCheckoutData] = useState<Partial<Order> | null>(null);

  const { cartId } = useParams();
  const { data: cart = {}, isLoading: isCartLoading } = useGetCart(cartId);

  if (isCartLoading) return <FullPageSpinner />;

  return (
    <CheckoutContext.Provider value={{ cart, checkoutData, setCheckoutData }}>
      {children}
    </CheckoutContext.Provider>
  );
}

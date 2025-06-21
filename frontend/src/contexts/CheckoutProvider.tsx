import { createContext } from "react";

import { useParams } from "react-router-dom";

import FullPageSpinner from "@/components/common/FullPageSpinner";
import { useGetCart } from "@/hooks/react-query/private/cart/useGetCart";
import { Cart } from "@/types";

type CheckoutProviderProps = {
  children: React.ReactNode;
};

type CheckoutContext = {
  cart: Cart;
};

export const CheckoutContext = createContext<CheckoutContext | null>(null);

export default function CheckoutProvider({ children }: CheckoutProviderProps) {
  const { cartId } = useParams();
  const { data: cart = {}, isLoading: isCartLoading } = useGetCart(cartId);

  if (isCartLoading) return <FullPageSpinner />;

  return (
    <CheckoutContext.Provider value={{ cart }}>
      {children}
    </CheckoutContext.Provider>
  );
}

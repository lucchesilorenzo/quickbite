import { createContext, useState } from "react";

import { useParams } from "react-router-dom";

import FullPageSpinner from "@/components/common/FullPageSpinner";
import { useGetCart } from "@/hooks/react-query/private/cart/useGetCart";
import { Cart } from "@/types";
import { PersonalInfo } from "@/types/order-types";

type CheckoutProviderProps = {
  children: React.ReactNode;
};

type CheckoutContext = {
  cart: Cart;
  personalInfo: PersonalInfo | null;
  setPersonalInfo: React.Dispatch<React.SetStateAction<PersonalInfo | null>>;
};

export const CheckoutContext = createContext<CheckoutContext | null>(null);

export default function CheckoutProvider({ children }: CheckoutProviderProps) {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);

  const { cartId } = useParams();
  const { data: cart = {}, isLoading: isCartLoading } = useGetCart(cartId);

  if (isCartLoading) return <FullPageSpinner />;

  return (
    <CheckoutContext.Provider value={{ cart, personalInfo, setPersonalInfo }}>
      {children}
    </CheckoutContext.Provider>
  );
}

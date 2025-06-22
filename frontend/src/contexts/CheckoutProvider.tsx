import { createContext, useState } from "react";

import { useParams } from "react-router-dom";

import FullPageSpinner from "@/components/common/FullPageSpinner";
import { useGetCart } from "@/hooks/react-query/private/cart/useGetCart";
import { Cart } from "@/types";
import {
  AddressInfo,
  DeliveryTime,
  OrderNotes,
  PersonalInfo,
} from "@/types/order-types";

type CheckoutProviderProps = {
  children: React.ReactNode;
};

type CheckoutContext = {
  cart: Cart;
  personalInfo: PersonalInfo | null;
  addressInfo: AddressInfo | null;
  deliveryTime: DeliveryTime | null;
  orderNotes: OrderNotes | null;
  setPersonalInfo: React.Dispatch<React.SetStateAction<PersonalInfo | null>>;
  setAddressInfo: React.Dispatch<React.SetStateAction<AddressInfo | null>>;
  setDeliveryTime: React.Dispatch<React.SetStateAction<DeliveryTime | null>>;
  setOrderNotes: React.Dispatch<React.SetStateAction<OrderNotes | null>>;
};

export const CheckoutContext = createContext<CheckoutContext | null>(null);

export default function CheckoutProvider({ children }: CheckoutProviderProps) {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [addressInfo, setAddressInfo] = useState<AddressInfo | null>(null);
  const [deliveryTime, setDeliveryTime] = useState<DeliveryTime | null>(null);
  const [orderNotes, setOrderNotes] = useState<OrderNotes | null>(null);

  const { cartId } = useParams();
  const { data: cart = {}, isLoading: isCartLoading } = useGetCart(cartId);

  if (isCartLoading) return <FullPageSpinner />;

  return (
    <CheckoutContext.Provider
      value={{
        cart,
        personalInfo,
        addressInfo,
        deliveryTime,
        orderNotes,
        setPersonalInfo,
        setAddressInfo,
        setDeliveryTime,
        setOrderNotes,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

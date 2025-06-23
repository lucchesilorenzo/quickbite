import { createContext, useState } from "react";

import { useNotifications } from "@toolpad/core/useNotifications";
import { useParams } from "react-router-dom";

import FullPageSpinner from "@/components/common/FullPageSpinner";
import { useGetCart } from "@/hooks/react-query/private/cart/useGetCart";
import { useCreateOrder } from "@/hooks/react-query/private/orders/useCreateOrder";
import { Cart } from "@/types";
import {
  AddressInfo,
  CreateOrder,
  DeliveryTime,
  OrderNotes,
  PaymentMethod,
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
  paymentMethod: PaymentMethod | null;
  setPersonalInfo: React.Dispatch<React.SetStateAction<PersonalInfo | null>>;
  setAddressInfo: React.Dispatch<React.SetStateAction<AddressInfo | null>>;
  setDeliveryTime: React.Dispatch<React.SetStateAction<DeliveryTime | null>>;
  setOrderNotes: React.Dispatch<React.SetStateAction<OrderNotes | null>>;
  setPaymentMethod: React.Dispatch<React.SetStateAction<PaymentMethod | null>>;
  handleCheckout: () => Promise<void>;
};

export const CheckoutContext = createContext<CheckoutContext | null>(null);

export default function CheckoutProvider({ children }: CheckoutProviderProps) {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [addressInfo, setAddressInfo] = useState<AddressInfo | null>(null);
  const [deliveryTime, setDeliveryTime] = useState<DeliveryTime | null>(null);
  const [orderNotes, setOrderNotes] = useState<OrderNotes | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
    null,
  );

  const { cartId } = useParams();
  const { data: cart = {}, isLoading: isCartLoading } = useGetCart(cartId);
  const { mutateAsync: createOrder } = useCreateOrder();
  const notifications = useNotifications();

  const restaurantCart = Object.values(cart)[0];

  async function handleCheckout() {
    if (!personalInfo || !addressInfo || !deliveryTime || !paymentMethod) {
      notifications.show("Please fill in all the required fields.", {
        key: "checkout-error",
        severity: "error",
      });

      return;
    }

    const order: CreateOrder = {
      ...personalInfo,
      ...addressInfo,
      ...deliveryTime,
      ...orderNotes,
      ...paymentMethod,
      restaurant_id: restaurantCart.restaurant_id,
      order_items: restaurantCart.items.map((i) => ({
        menu_item_id: i.id,
        quantity: i.quantity,
        item_total: i.item_total,
      })),
    };

    console.log(order);

    await createOrder(order);
  }

  if (isCartLoading) return <FullPageSpinner />;

  return (
    <CheckoutContext.Provider
      value={{
        cart,
        personalInfo,
        addressInfo,
        deliveryTime,
        orderNotes,
        paymentMethod,
        setPersonalInfo,
        setAddressInfo,
        setDeliveryTime,
        setOrderNotes,
        setPaymentMethod,
        handleCheckout,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

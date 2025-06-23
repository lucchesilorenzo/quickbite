import { createContext, useEffect, useState } from "react";

import { useNotifications } from "@toolpad/core/useNotifications";
import { useParams } from "react-router-dom";

import FullPageSpinner from "@/components/common/FullPageSpinner";
import { useAuth } from "@/hooks/contexts/useAuth";
import { useGetCart } from "@/hooks/react-query/private/cart/useGetCart";
import { useCreateOrder } from "@/hooks/react-query/private/orders/useCreateOrder";
import { Cart } from "@/types";
import { CheckoutData, CreateOrder } from "@/types/order-types";

type CheckoutProviderProps = {
  children: React.ReactNode;
};

type CheckoutContext = {
  cart: Cart;
  checkoutData: CheckoutData;
  setCheckoutData: React.Dispatch<React.SetStateAction<CheckoutData>>;
  handleCheckout: () => Promise<void>;
};

export const CheckoutContext = createContext<CheckoutContext | null>(null);

export default function CheckoutProvider({ children }: CheckoutProviderProps) {
  const { cartId } = useParams();
  const { data: cart = {}, isLoading: isCartLoading } = useGetCart(cartId);
  const restaurantCart = Object.values(cart)[0];

  const { user } = useAuth();
  const { mutateAsync: createOrder } = useCreateOrder(
    restaurantCart?.restaurant_id,
  );

  const notifications = useNotifications();

  const [checkoutData, setCheckoutData] = useState<CheckoutData>(() => {
    const stored = localStorage.getItem("checkout_data");
    return stored
      ? JSON.parse(stored)
      : {
          personal_info: {
            first_name: user?.first_name || "",
            last_name: user?.last_name || "",
            phone_number: user?.phone_number || "",
          },
          address_info: {
            street_address: user?.street_address || "",
            building_number: user?.building_number || "",
            postcode: user?.postcode || "",
            city: user?.city || "",
          },
          delivery_time: null,
          order_notes: null,
          payment_method: null,
        };
  });

  useEffect(() => {
    localStorage.setItem("checkout_data", JSON.stringify(checkoutData));
  }, [checkoutData]);

  async function handleCheckout() {
    const isPersonalInfoValid =
      checkoutData.personal_info &&
      checkoutData.personal_info.first_name.trim() &&
      checkoutData.personal_info.last_name.trim() &&
      checkoutData.personal_info.phone_number.trim();

    const isAddressValid =
      checkoutData.address_info &&
      checkoutData.address_info.street_address.trim() &&
      checkoutData.address_info.building_number.trim() &&
      checkoutData.address_info.postcode.trim() &&
      checkoutData.address_info.city.trim();

    if (
      !isPersonalInfoValid ||
      !isAddressValid ||
      !checkoutData.delivery_time ||
      !checkoutData.payment_method
    ) {
      notifications.show("Please fill in all the required fields.", {
        key: "checkout-error",
        severity: "error",
      });

      return;
    }

    const order: CreateOrder = {
      ...checkoutData.personal_info,
      ...checkoutData.address_info,
      ...checkoutData.delivery_time,
      ...checkoutData.order_notes,
      ...checkoutData.payment_method,
      restaurant_id: restaurantCart.restaurant_id,
      order_items: restaurantCart.items.map((i) => ({
        menu_item_id: i.id,
        quantity: i.quantity,
        item_total: i.item_total,
      })),
    };

    await createOrder(order);
  }

  if (isCartLoading) return <FullPageSpinner />;

  return (
    <CheckoutContext.Provider
      value={{
        cart,
        checkoutData,
        setCheckoutData,
        handleCheckout,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

import { createContext, useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import FullPageSpinner from "@/components/common/FullPageSpinner";
import { useAuth } from "@/hooks/contexts/useAuth";
import { useGetCustomerCart } from "@/hooks/react-query/private/customers/carts/useGetCustomerCart";
import { RestaurantCart } from "@/types";
import { CheckoutData } from "@/types/order-types";

type CheckoutProviderProps = {
  children: React.ReactNode;
};

type CheckoutContext = {
  cart: RestaurantCart;
  checkoutData: CheckoutData;
  restaurantId: string;
  setCheckoutData: React.Dispatch<React.SetStateAction<CheckoutData>>;
  emptyCheckoutData: (restaurantId: string) => void;
};

export const CheckoutContext = createContext<CheckoutContext | null>(null);

export default function CheckoutProvider({ children }: CheckoutProviderProps) {
  const { cartId } = useParams();
  const { user } = useAuth();

  const { data: cart, isLoading: isCartLoading } = useGetCustomerCart(cartId);
  const restaurantId = cart?.restaurant.id;

  const [checkoutData, setCheckoutData] = useState<CheckoutData>(() => {
    const stored = localStorage.getItem("checkout_data_by_restaurant");
    return stored ? JSON.parse(stored) : {};
  });

  const isCheckoutReady = !!(restaurantId && checkoutData[restaurantId]);

  useEffect(() => {
    if (!restaurantId) return;

    setCheckoutData((prev) => {
      if (prev[restaurantId]) return prev;

      return {
        ...prev,
        [restaurantId]: {
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
        },
      };
    });
  }, [restaurantId, user]);

  useEffect(() => {
    localStorage.setItem(
      "checkout_data_by_restaurant",
      JSON.stringify(checkoutData),
    );
  }, [checkoutData]);

  function emptyCheckoutData(restaurantId: string) {
    setCheckoutData((prev) => {
      const copy = { ...prev };

      delete copy[restaurantId];
      return copy;
    });
  }

  if (isCartLoading || !isCheckoutReady) {
    return <FullPageSpinner />;
  }

  return (
    <CheckoutContext.Provider
      value={{
        cart,
        checkoutData,
        restaurantId,
        setCheckoutData,
        emptyCheckoutData,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

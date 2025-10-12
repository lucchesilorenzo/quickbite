import { createContext, useContext, useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import FullPageSpinner from "@/components/common/FullPageSpinner";
import { useAuth } from "@/contexts/public/AuthProvider";
import { useGetCart } from "@/hooks/react-query/private/customer/carts/useGetCart";
import { useGetRestaurantDeliverySlots } from "@/hooks/react-query/public/restaurants/useGetRestaurantDeliverySlots";
import { useGetRestaurantOffers } from "@/hooks/react-query/public/restaurants/useGetRestaurantOffers";
import { deliverySlotsDefaults, offersDefaults } from "@/lib/query-defaults";
import {
  CheckoutData,
  DeliverySlots,
  OfferWithPagination,
  RestaurantCart,
} from "@/types";

type CheckoutProviderProps = {
  children: React.ReactNode;
};

type CheckoutContext = {
  cart: RestaurantCart;
  checkoutData: CheckoutData;
  restaurantId: string;
  offersData: OfferWithPagination;
  deliverySlots: DeliverySlots;
  isLoadingDeliverySlots: boolean;
  setFetchDeliverySlots: React.Dispatch<React.SetStateAction<boolean>>;
  setCheckoutData: React.Dispatch<React.SetStateAction<CheckoutData>>;
  emptyCheckoutData: (restaurantId: string) => void;
};

const CheckoutContext = createContext<CheckoutContext | null>(null);

export default function CheckoutProvider({ children }: CheckoutProviderProps) {
  const { cartId } = useParams();
  const { user } = useAuth();

  const [fetchDeliverySlots, setFetchDeliverySlots] = useState(false);

  const { data: cart, isLoading: isLoadingCart } = useGetCart(cartId);
  const restaurantId = cart?.restaurant.id;

  const { data: offersData = offersDefaults, isLoading: isLoadingOffers } =
    useGetRestaurantOffers(restaurantId!);

  const {
    data: deliverySlots = deliverySlotsDefaults,
    isLoading: isLoadingDeliverySlots,
  } = useGetRestaurantDeliverySlots(restaurantId!, fetchDeliverySlots);

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
            state: user?.state || "",
          },
          delivery_time: {
            type: null,
            value: "",
          },
          notes: null,
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

  if (isLoadingCart || isLoadingOffers || !isCheckoutReady) {
    return <FullPageSpinner />;
  }

  return (
    <CheckoutContext.Provider
      value={{
        cart,
        checkoutData,
        restaurantId,
        offersData,
        deliverySlots,
        isLoadingDeliverySlots,
        setFetchDeliverySlots,
        setCheckoutData,
        emptyCheckoutData,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);

  if (!context) {
    throw new Error("useCheckout must be used within a CheckoutProvider.");
  }

  return context;
}

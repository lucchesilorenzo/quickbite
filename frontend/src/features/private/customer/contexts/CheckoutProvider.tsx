import { createContext, useContext, useEffect, useRef, useState } from "react";

import { useGetCart } from "@customer/hooks/carts/useGetCart";
import { CheckoutData } from "@customer/types/order/order.types";
import { useParams } from "react-router-dom";

import FullPageSpinner from "@/components/common/FullPageSpinner";
import { useAuth } from "@/contexts/AuthProvider";
import { useGetOffers } from "@/hooks/offers/useGetOffers";
import { useGetDeliverySlots } from "@/hooks/restaurants/useGetDeliverySlots";
import { deliverySlotsDefaults, offersDefaults } from "@/lib/query-defaults";
import { RestaurantCart } from "@/types/cart.types";
import { DeliverySlots } from "@/types/delivery/delivery.types";
import { OffersWithPagination } from "@/types/offer/offer.types";

type CheckoutProviderProps = {
  children: React.ReactNode;
};

type CheckoutContext = {
  cart: RestaurantCart;
  checkoutData: CheckoutData;
  restaurantId: string;
  offersData: OffersWithPagination;
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

  const { data: cart, isLoading: isLoadingCart } = useGetCart({ cartId });
  const restaurantId = cart?.restaurant.id;

  const { data: offersData = offersDefaults, isLoading: isLoadingOffers } =
    useGetOffers({ restaurantId: restaurantId! });

  const {
    data: deliverySlots = deliverySlotsDefaults,
    isLoading: isLoadingDeliverySlots,
  } = useGetDeliverySlots({
    restaurantId: restaurantId!,
    enabled: fetchDeliverySlots,
  });

  const [checkoutData, setCheckoutData] = useState<CheckoutData>(() => {
    const stored = localStorage.getItem("checkout_data_by_restaurant");
    return stored ? JSON.parse(stored) : {};
  });

  const isCheckoutReady = !!(restaurantId && checkoutData[restaurantId]);

  const initialized = useRef(false);

  useEffect(() => {
    if (!restaurantId) return;

    setCheckoutData((prev) => {
      if (prev[restaurantId]) return prev;

      initialized.current = true;

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
          delivery_time: { type: null, value: "" },
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

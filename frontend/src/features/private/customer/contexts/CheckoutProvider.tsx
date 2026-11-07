import { createContext, useContext, useEffect, useRef, useState } from "react";

import { useGetCart } from "@customer/hooks/carts/useGetCart";
import { useNotifications } from "@toolpad/core/useNotifications";
import { useNavigate, useParams } from "react-router-dom";

import {
  GetCustomerCart200,
  GetDeliverySlots200,
  GetOffers200,
} from "@/api/models";
import FullPageSpinner from "@/components/common/FullPageSpinner";
import { useAuth } from "@/contexts/AuthProvider";
import { useGetOffers } from "@/hooks/offers/useGetOffers";
import { useGetDeliverySlots } from "@/hooks/restaurants/useGetDeliverySlots";
import { CheckoutData } from "@/types/order.types";

type CheckoutProviderProps = {
  children: React.ReactNode;
};

type CheckoutContext = {
  cartData: GetCustomerCart200;
  checkoutData: CheckoutData;
  restaurantId: string;
  offersData?: GetOffers200;
  offersError: Error | null;
  deliverySlotsData?: GetDeliverySlots200;
  isLoadingDeliverySlots: boolean;
  deliverySlotsError: Error | null;
  setCheckoutData: React.Dispatch<React.SetStateAction<CheckoutData>>;
  emptyCheckoutData: (restaurantId: string) => void;
};

const CheckoutContext = createContext<CheckoutContext | null>(null);

export default function CheckoutProvider({ children }: CheckoutProviderProps) {
  const { cartId } = useParams();
  const { user } = useAuth();

  const navigate = useNavigate();
  const notifications = useNotifications();

  const {
    data: cartData,
    isLoading: isLoadingCart,
    error: cartError,
  } = useGetCart({ cartId });

  const restaurantId = cartData?.data.restaurant.id;

  const {
    data: offersData,
    isLoading: isLoadingOffers,
    error: offersError,
  } = useGetOffers({ restaurantId });

  const {
    data: deliverySlotsData,
    isLoading: isLoadingDeliverySlots,
    error: deliverySlotsError,
  } = useGetDeliverySlots({ restaurantId });

  const [checkoutData, setCheckoutData] = useState<CheckoutData>(() => {
    const stored = localStorage.getItem("checkout_data_by_restaurant");
    return stored ? JSON.parse(stored) : {};
  });

  const initialized = useRef(false);
  const isCheckoutReady = !!(restaurantId && checkoutData[restaurantId]);

  useEffect(() => {
    if (isLoadingCart || !cartError) return;

    const lastRestaurantUrl = localStorage.getItem("last_restaurant_url");

    if (lastRestaurantUrl) {
      navigate(lastRestaurantUrl, { replace: true });
    } else {
      navigate("/", { replace: true });
    }

    notifications.show(cartError.message, {
      key: "cart-error",
      severity: "error",
    });

    return () => {
      localStorage.removeItem("last_restaurant_url");
    };
  }, [isLoadingCart, cartError, notifications, navigate]);

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
        cartData,
        checkoutData,
        restaurantId,
        offersData,
        offersError,
        deliverySlotsData,
        isLoadingDeliverySlots,
        deliverySlotsError,
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

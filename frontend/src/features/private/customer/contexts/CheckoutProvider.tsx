import { createContext, useContext, useEffect, useRef, useState } from "react";

import { useGetCart } from "@customer/hooks/carts/useGetCart";
import { CheckoutData } from "@customer/types/orders/order.types";
import { useNotifications } from "@toolpad/core/useNotifications";
import { useNavigate, useParams } from "react-router-dom";

import { cartDefaults } from "../lib/query-defaults";
import { GetCartResponse } from "../types/carts/cart.api.types";

import FullPageSpinner from "@/components/common/FullPageSpinner";
import { useAuth } from "@/contexts/AuthProvider";
import { useGetOffers } from "@/hooks/offers/useGetOffers";
import { useGetDeliverySlots } from "@/hooks/restaurants/useGetDeliverySlots";
import { offersDefaults } from "@/lib/query-defaults";
import { GetDeliverySlotsResponse } from "@/types/deliveries/delivery.api.types";
import { GetOffersResponse } from "@/types/offers/offer.api.types";

type CheckoutProviderProps = {
  children: React.ReactNode;
};

type CheckoutContext = {
  cartData: GetCartResponse;
  checkoutData: CheckoutData;
  restaurantId: string;
  offersData: GetOffersResponse;
  offersError: Error | null;
  deliverySlotsData: GetDeliverySlotsResponse;
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
    data: cartData = { success: false, message: "", cart: cartDefaults },
    isLoading: isLoadingCart,
    error: cartError,
  } = useGetCart({ cartId });

  const restaurantId = cartData.cart.restaurant.id;

  const {
    data: offersData = { success: false, message: "", offers: offersDefaults },
    isLoading: isLoadingOffers,
    error: offersError,
  } = useGetOffers({ restaurantId });

  const {
    data: deliverySlotsData = {
      success: false,
      message: "",
      is_asap_available: false,
      delivery_slots: [],
    },
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
    if (isLoadingDeliverySlots || !deliverySlotsError) return;

    setCheckoutData((prev) => ({
      ...prev,
      [restaurantId]: {
        ...prev[restaurantId],
        delivery_time: { type: null, value: "" },
      },
    }));
  }, [deliverySlotsError, restaurantId]);

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

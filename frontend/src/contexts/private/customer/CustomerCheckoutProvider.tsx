import { createContext, useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import FullPageSpinner from "@/components/common/FullPageSpinner";
import { useAuth } from "@/hooks/contexts/public/useAuth";
import { useGetCustomerCart } from "@/hooks/react-query/private/customers/carts/useGetCustomerCart";
import { useGetRestaurantOffers } from "@/hooks/react-query/public/restaurants/useGetRestaurantOffers";
import { offersDefaults } from "@/lib/query-defaults";
import { CheckoutData, OfferWithPagination, RestaurantCart } from "@/types";

type CustomerCheckoutProviderProps = {
  children: React.ReactNode;
};

type CustomerCheckoutContext = {
  cart: RestaurantCart;
  checkoutData: CheckoutData;
  restaurantId: string;
  offersData: OfferWithPagination;
  setCheckoutData: React.Dispatch<React.SetStateAction<CheckoutData>>;
  emptyCheckoutData: (restaurantId: string) => void;
};

export const CustomerCheckoutContext =
  createContext<CustomerCheckoutContext | null>(null);

export default function CustomerCheckoutProvider({
  children,
}: CustomerCheckoutProviderProps) {
  const { cartId } = useParams();
  const { user } = useAuth();

  const { data: cart, isLoading: isLoadingCart } = useGetCustomerCart(cartId);
  const restaurantId = cart?.restaurant.id;

  const { data: offersData = offersDefaults, isLoading: isLoadingOffers } =
    useGetRestaurantOffers(restaurantId!);

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
    <CustomerCheckoutContext.Provider
      value={{
        cart,
        checkoutData,
        restaurantId,
        offersData,
        setCheckoutData,
        emptyCheckoutData,
      }}
    >
      {children}
    </CustomerCheckoutContext.Provider>
  );
}

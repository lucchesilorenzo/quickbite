import { createContext, useContext } from "react";

import { useGetRestaurant } from "../hooks/restaurant/useGetRestaurant";

import { GetRiderRestaurant200 } from "@/api/models";

type RestaurantProviderProps = {
  children: React.ReactNode;
};

type RestaurantContext = {
  restaurantData?: GetRiderRestaurant200;
  isLoadingRestaurant: boolean;
  restaurantError: Error | null;
};

const RestaurantContext = createContext<RestaurantContext | null>(null);

export default function RestaurantProvider({
  children,
}: RestaurantProviderProps) {
  const {
    data: restaurantData,
    isLoading: isLoadingRestaurant,
    error: restaurantError,
  } = useGetRestaurant();

  return (
    <RestaurantContext.Provider
      value={{ restaurantData, isLoadingRestaurant, restaurantError }}
    >
      {children}
    </RestaurantContext.Provider>
  );
}

export function useRestaurant() {
  const context = useContext(RestaurantContext);

  if (!context) {
    throw new Error("useRestaurant must be used within a RestaurantProvider.");
  }

  return context;
}

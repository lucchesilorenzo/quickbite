import { createContext, useState } from "react";

import { useCookies } from "react-cookie";

import { useGetRestaurants } from "@/hooks/react-query/restaurants/useGetRestaurants";
import { RestaurantListItem } from "@/types";

type RestaurantProviderProps = {
  children: React.ReactNode;
};

type RestaurantContext = {
  restaurants: RestaurantListItem[];
  isRestaurantsLoading: boolean;
  restaurantsError: Error | null;
  viewMap: boolean;
  setViewMap: React.Dispatch<React.SetStateAction<boolean>>;
};

export const RestaurantContext = createContext<RestaurantContext | null>(null);

export default function RestaurantProvider({
  children,
}: RestaurantProviderProps) {
  const [cookies] = useCookies(["address"]);
  const [viewMap, setViewMap] = useState(false);

  const postcode = cookies.address?.address?.postcode;

  const {
    data: restaurants = [],
    isLoading: isRestaurantsLoading,
    error: restaurantsError,
  } = useGetRestaurants(postcode);

  return (
    <RestaurantContext.Provider
      value={{
        restaurants,
        isRestaurantsLoading,
        restaurantsError,
        viewMap,
        setViewMap,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
}

import { createContext, useState } from "react";

import { useSingleRestaurant } from "@/hooks/contexts/useSingleRestaurant";
import { useGetRestaurantOffers } from "@/hooks/react-query/public/restaurants/useGetRestaurantOffers";
import { OfferWithPagination } from "@/types";

type RestaurantOffersProviderProps = {
  children: React.ReactNode;
};

type RestaurantOffersContext = {
  offersData?: OfferWithPagination;
  page: number;
  isLoadingOffers: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export const RestaurantOffersContext =
  createContext<RestaurantOffersContext | null>(null);

export default function RestaurantOffersProvider({
  children,
}: RestaurantOffersProviderProps) {
  const { restaurant } = useSingleRestaurant();

  const [page, setPage] = useState(1);

  const { data: offersData, isLoading: isLoadingOffers } =
    useGetRestaurantOffers(restaurant.id, page);

  return (
    <RestaurantOffersContext.Provider
      value={{ offersData, page, isLoadingOffers, setPage }}
    >
      {children}
    </RestaurantOffersContext.Provider>
  );
}

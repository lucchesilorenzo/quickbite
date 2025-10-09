import { createContext, useState } from "react";

import { useRestaurant } from "@/hooks/contexts/public/useRestaurant";
import { useGetRestaurantOffers } from "@/hooks/react-query/public/restaurants/useGetRestaurantOffers";
import { offersDefaults } from "@/lib/query-defaults";
import { OfferWithPagination } from "@/types";

type OffersProviderProps = {
  children: React.ReactNode;
};

type OffersContext = {
  offersData: OfferWithPagination;
  page: number;
  isLoadingOffers: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export const OffersContext = createContext<OffersContext | null>(null);

export default function OffersProvider({ children }: OffersProviderProps) {
  const { restaurant } = useRestaurant();

  const [page, setPage] = useState(1);

  const { data: offersData = offersDefaults, isLoading: isLoadingOffers } =
    useGetRestaurantOffers(restaurant.id, page);

  return (
    <OffersContext.Provider
      value={{ offersData, page, isLoadingOffers, setPage }}
    >
      {children}
    </OffersContext.Provider>
  );
}

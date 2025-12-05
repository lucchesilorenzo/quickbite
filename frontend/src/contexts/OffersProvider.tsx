import { createContext, useContext, useState } from "react";

import { useRestaurant } from "./RestaurantProvider";

import { useGetOffers } from "@/hooks/offers/useGetOffers";
import { offersDefaults } from "@/lib/query-defaults";
import { OffersWithPagination } from "@/types/offer/offer.types";

type OffersProviderProps = {
  children: React.ReactNode;
};

type OffersContext = {
  offersData: OffersWithPagination;
  page: number;
  isLoadingOffers: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const OffersContext = createContext<OffersContext | null>(null);

export default function OffersProvider({ children }: OffersProviderProps) {
  const { restaurant } = useRestaurant();

  const [page, setPage] = useState(1);

  const { data: offersData = offersDefaults, isLoading: isLoadingOffers } =
    useGetOffers({ restaurantId: restaurant.id, page });

  return (
    <OffersContext.Provider
      value={{ offersData, page, isLoadingOffers, setPage }}
    >
      {children}
    </OffersContext.Provider>
  );
}

export function useOffers() {
  const context = useContext(OffersContext);

  if (!context) {
    throw new Error("useOffers must be used within a OffersProvider.");
  }

  return context;
}

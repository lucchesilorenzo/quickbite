import { createContext, useContext, useState } from "react";

import { useRestaurant } from "./RestaurantProvider";

import { useGetOffers } from "@/hooks/offers/useGetOffers";
import { offersDefaults } from "@/lib/query-defaults";
import { GetOffersResponse } from "@/types/offers/offer.api.types";

type OffersProviderProps = {
  children: React.ReactNode;
};

type OffersContext = {
  data: GetOffersResponse;
  page: number;
  isLoadingOffers: boolean;
  offersError: Error | null;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const OffersContext = createContext<OffersContext | null>(null);

export default function OffersProvider({ children }: OffersProviderProps) {
  const { restaurantData } = useRestaurant();

  const [page, setPage] = useState(1);

  const {
    data = { success: false, message: "", offers: offersDefaults },
    isLoading: isLoadingOffers,
    error: offersError,
  } = useGetOffers({ restaurantId: restaurantData.restaurant.id, page });

  return (
    <OffersContext.Provider
      value={{ data, page, isLoadingOffers, offersError, setPage }}
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

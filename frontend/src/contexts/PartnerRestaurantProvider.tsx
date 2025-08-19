import { createContext } from "react";

import { Navigate, useParams } from "react-router-dom";

import FullPageSpinner from "@/components/common/FullPageSpinner";
import { useGetPartnerRestaurant } from "@/hooks/react-query/private/partners/restaurants/restaurant/useGetPartnerRestaurant";
import { PartnerRestaurantDetail } from "@/types";

type PartnerRestaurantProviderProps = {
  children: React.ReactNode;
};

type PartnerRestaurantContext = {
  restaurant: PartnerRestaurantDetail;
};

export const PartnerRestaurantContext =
  createContext<PartnerRestaurantContext | null>(null);

export default function PartnerRestaurantProvider({
  children,
}: PartnerRestaurantProviderProps) {
  const { restaurantId } = useParams();

  const {
    data: restaurant,
    isLoading,
    isError,
  } = useGetPartnerRestaurant(restaurantId);

  if (isLoading) return <FullPageSpinner />;
  if (isError || !restaurant) return <Navigate to="*" />;

  return (
    <PartnerRestaurantContext.Provider value={{ restaurant }}>
      {children}
    </PartnerRestaurantContext.Provider>
  );
}

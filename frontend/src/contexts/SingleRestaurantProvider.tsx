import { createContext, useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import Spinner from "@/components/common/Spinner";
import { useGetRestaurant } from "@/hooks/react-query/restaurants/useGetRestaurant";
import ErrorPage from "@/pages/ErrorPage";
import { RestaurantDetail } from "@/types";

type SingleRestaurantProviderProps = {
  children: React.ReactNode;
};

type SingleRestaurantContext = {
  restaurant: RestaurantDetail;
  openRestaurantAboutDialog: boolean;
  setOpenRestaurantAboutDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SingleRestaurantContext =
  createContext<SingleRestaurantContext | null>(null);

export default function SingleRestaurantProvider({
  children,
}: SingleRestaurantProviderProps) {
  const { restaurantSlug } = useParams();

  const {
    data: restaurant,
    isLoading: isRestaurantLoading,
    error: restaurantError,
  } = useGetRestaurant(restaurantSlug);

  const [openRestaurantAboutDialog, setOpenRestaurantAboutDialog] =
    useState(false);

  useEffect(() => {
    if (restaurant?.name && restaurant?.city) {
      document.title = `${restaurant.name} restaurant menu in ${restaurant.city} - Order from QuickBite`;
    }
  }, [restaurant?.name, restaurant?.city]);

  if (isRestaurantLoading) return <Spinner />;

  if (!restaurant || restaurantError) {
    return <ErrorPage error={restaurantError} />;
  }

  return (
    <SingleRestaurantContext.Provider
      value={{
        restaurant,
        openRestaurantAboutDialog,
        setOpenRestaurantAboutDialog,
      }}
    >
      {children}
    </SingleRestaurantContext.Provider>
  );
}

import { createContext, useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import Spinner from "@/components/common/Spinner";
import { useGetRestaurant } from "@/hooks/react-query/public/restaurants/useGetRestaurant";
import ErrorPage from "@/pages/public/ErrorPage";
import { RestaurantDetail } from "@/types";

type SingleRestaurantProviderProps = {
  children: React.ReactNode;
};

type SingleRestaurantContext = {
  restaurant: RestaurantDetail;
  openRestaurantAboutDialog: boolean;
  searchTerm: string;
  setOpenRestaurantAboutDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
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
  const [searchTerm, setSearchTerm] = useState("");

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
        searchTerm,
        setOpenRestaurantAboutDialog,
        setSearchTerm,
      }}
    >
      {children}
    </SingleRestaurantContext.Provider>
  );
}

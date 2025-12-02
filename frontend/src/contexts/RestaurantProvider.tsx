import { createContext, useContext, useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import Spinner from "@/components/common/Spinner";
import { useGetRestaurant } from "@/hooks/restaurants/useGetRestaurant";
import ErrorPage from "@/pages/public/ErrorPage";
import {
  RestaurantTab,
  SingleRestaurantDetail,
} from "@/types/restaurant.types";

type RestaurantProviderProps = {
  children: React.ReactNode;
};

type RestaurantContext = {
  restaurant: SingleRestaurantDetail;
  openRestaurantAboutDialog: boolean;
  searchTerm: string;
  tabToOpen: RestaurantTab;
  scrollToDeliveryFee: boolean;
  openRestaurantClosedDialog: boolean;
  setOpenRestaurantClosedDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setScrollToDeliveryFee: React.Dispatch<React.SetStateAction<boolean>>;
  setTabToOpen: React.Dispatch<React.SetStateAction<RestaurantTab>>;
  setOpenRestaurantAboutDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

const RestaurantContext = createContext<RestaurantContext | null>(null);

export default function RestaurantProvider({
  children,
}: RestaurantProviderProps) {
  const { restaurantSlug } = useParams();

  const {
    data: restaurant,
    isLoading: isRestaurantLoading,
    error: restaurantError,
  } = useGetRestaurant(restaurantSlug);

  const [openRestaurantClosedDialog, setOpenRestaurantClosedDialog] =
    useState(false);
  const [openRestaurantAboutDialog, setOpenRestaurantAboutDialog] =
    useState(false);
  const [scrollToDeliveryFee, setScrollToDeliveryFee] = useState(false);
  const [tabToOpen, setTabToOpen] = useState<RestaurantTab>("info");
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
    <RestaurantContext.Provider
      value={{
        restaurant,
        openRestaurantAboutDialog,
        searchTerm,
        tabToOpen,
        scrollToDeliveryFee,
        openRestaurantClosedDialog,
        setOpenRestaurantClosedDialog,
        setScrollToDeliveryFee,
        setTabToOpen,
        setOpenRestaurantAboutDialog,
        setSearchTerm,
      }}
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

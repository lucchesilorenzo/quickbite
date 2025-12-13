import { createContext, useContext, useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import Spinner from "@/components/common/Spinner";
import { useGetRestaurant } from "@/hooks/restaurants/useGetRestaurant";
import { restaurantDefaults } from "@/lib/query-defaults";
import ErrorPage from "@/pages/public/ErrorPage";
import { GetRestaurantResponse } from "@/types/restaurants/restaurant.api.types";
import { RestaurantTab } from "@/types/restaurants/restaurant.types";

type RestaurantProviderProps = {
  children: React.ReactNode;
};

type RestaurantContext = {
  restaurantData: GetRestaurantResponse;
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
    data: restaurantData = {
      success: false,
      message: "",
      restaurant: restaurantDefaults,
    },
    isLoading: isRestaurantLoading,
    error: restaurantError,
  } = useGetRestaurant({ restaurantSlug });

  const [openRestaurantClosedDialog, setOpenRestaurantClosedDialog] =
    useState(false);
  const [openRestaurantAboutDialog, setOpenRestaurantAboutDialog] =
    useState(false);
  const [scrollToDeliveryFee, setScrollToDeliveryFee] = useState(false);
  const [tabToOpen, setTabToOpen] = useState<RestaurantTab>("info");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (restaurantData.restaurant?.name && restaurantData.restaurant?.city) {
      document.title = `${restaurantData.restaurant.name} restaurant menu in ${restaurantData.restaurant.city} - Order from QuickBite`;
    }
  }, [restaurantData.restaurant?.name, restaurantData.restaurant?.city]);

  if (isRestaurantLoading) return <Spinner />;

  if (!restaurantData.restaurant || restaurantError) {
    return <ErrorPage error={restaurantError} />;
  }

  return (
    <RestaurantContext.Provider
      value={{
        restaurantData,
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

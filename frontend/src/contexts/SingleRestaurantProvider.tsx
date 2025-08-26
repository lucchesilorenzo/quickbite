import { createContext, useEffect, useRef, useState } from "react";

import { useParams } from "react-router-dom";

import Spinner from "@/components/common/Spinner";
import { useGetRestaurant } from "@/hooks/react-query/public/restaurants/useGetRestaurant";
import ErrorPage from "@/pages/public/ErrorPage";
import { RestaurantTab, SingleRestaurantDetail } from "@/types";

type SingleRestaurantProviderProps = {
  children: React.ReactNode;
};

type SingleRestaurantContext = {
  restaurant: SingleRestaurantDetail;
  openRestaurantAboutDialog: boolean;
  searchTerm: string;
  tabToOpen: RestaurantTab;
  scrollToDeliveryFee: boolean;
  menuCategoryRefs: React.RefObject<Record<string, HTMLDivElement | null>>;
  openRestaurantClosedDialog: boolean;
  setOpenRestaurantClosedDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setScrollToDeliveryFee: React.Dispatch<React.SetStateAction<boolean>>;
  setTabToOpen: React.Dispatch<React.SetStateAction<RestaurantTab>>;
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

  const [openRestaurantClosedDialog, setOpenRestaurantClosedDialog] =
    useState(false);
  const [openRestaurantAboutDialog, setOpenRestaurantAboutDialog] =
    useState(false);
  const [scrollToDeliveryFee, setScrollToDeliveryFee] = useState(false);
  const [tabToOpen, setTabToOpen] = useState<RestaurantTab>("info");
  const [searchTerm, setSearchTerm] = useState("");

  const menuCategoryRefs = useRef<Record<string, HTMLDivElement | null>>({});

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
        tabToOpen,
        scrollToDeliveryFee,
        menuCategoryRefs,
        openRestaurantClosedDialog,
        setOpenRestaurantClosedDialog,
        setScrollToDeliveryFee,
        setTabToOpen,
        setOpenRestaurantAboutDialog,
        setSearchTerm,
      }}
    >
      {children}
    </SingleRestaurantContext.Provider>
  );
}

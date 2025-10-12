import { createContext, useContext, useState } from "react";

import { useMediaQuery } from "@mui/material";
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { useAddress } from "./AddressProvider";

import { useGetRestaurants } from "@/hooks/restaurants/useGetRestaurants";
import { restaurantsDefaults } from "@/lib/query-defaults";
import {
  RestaurantListItem,
  RestaurantMeta,
  RestaurantSearchOption,
  RestaurantWithPagination,
} from "@/types";

type RestaurantsProviderProps = {
  children: React.ReactNode;
};

type RestaurantsContext = {
  restaurantsData: RestaurantListItem[];
  isRestaurantsLoading: boolean;
  restaurantsError: Error | null;
  viewMap: boolean;
  isMapViewMobile: boolean;
  selectedOption: RestaurantSearchOption | string | null;
  movCounts: RestaurantMeta["mov_counts"];
  offerCounts: RestaurantMeta["offer_counts"];
  totalRestaurants: number;
  isFetchingNextPage: boolean;
  setViewMap: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedOption: React.Dispatch<
    React.SetStateAction<RestaurantSearchOption | string | null>
  >;
  fetchNextPage: (
    options?: FetchNextPageOptions,
  ) => Promise<
    InfiniteQueryObserverResult<InfiniteData<RestaurantWithPagination>>
  >;
};

const RestaurantsContext = createContext<RestaurantsContext | null>(null);

export default function RestaurantsProvider({
  children,
}: RestaurantsProviderProps) {
  const { currentAddress } = useAddress();

  const [searchParams] = useSearchParams();
  const [viewMap, setViewMap] = useState(false);
  const [selectedOption, setSelectedOption] = useState<
    RestaurantSearchOption | string | null
  >(null);

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const isMapViewMobile = isMobile && viewMap;

  const filters = searchParams.getAll("filter");
  const sortBy = searchParams.get("sort_by");
  const mov = searchParams.get("mov");
  const search = searchParams.get("q");

  const {
    data: restaurants = restaurantsDefaults,
    isLoading: isRestaurantsLoading,
    error: restaurantsError,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetRestaurants({
    lat: currentAddress?.lat,
    lon: currentAddress?.lon,
    filters,
    sortBy,
    mov,
    search,
  });

  const restaurantsData = restaurants.pages.flatMap(
    (page) => page.restaurants.data,
  );
  const totalRestaurants = restaurants.pages[0].meta.total;
  const movCounts = restaurants.pages[0].meta.mov_counts;
  const offerCounts = restaurants.pages[0].meta.offer_counts;

  return (
    <RestaurantsContext.Provider
      value={{
        restaurantsData,
        movCounts,
        offerCounts,
        isRestaurantsLoading,
        restaurantsError,
        viewMap,
        isMapViewMobile,
        selectedOption,
        isFetchingNextPage,
        totalRestaurants,
        setViewMap,
        setSelectedOption,
        fetchNextPage,
      }}
    >
      {children}
    </RestaurantsContext.Provider>
  );
}

export function useRestaurants() {
  const context = useContext(RestaurantsContext);

  if (!context) {
    throw new Error(
      "useRestaurants must be used within a RestaurantsProvider.",
    );
  }

  return context;
}

import { createContext, useState } from "react";

import { useMediaQuery } from "@mui/material";
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { useAddress } from "@/hooks/contexts/useAddress";
import { useGetRestaurants } from "@/hooks/react-query/public/restaurants/useGetRestaurants";
import {
  RestaurantListItem,
  RestaurantMeta,
  RestaurantSearchOption,
  RestaurantWithPagination,
} from "@/types";

type RestaurantProviderProps = {
  children: React.ReactNode;
};

type RestaurantContext = {
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

export const RestaurantContext = createContext<RestaurantContext | null>(null);

export default function RestaurantProvider({
  children,
}: RestaurantProviderProps) {
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
    data: restaurants,
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
  const movCounts = restaurants.pages[0].meta.mov_counts;
  const offerCounts = restaurants.pages[0].meta.offer_counts;
  const totalRestaurants = restaurants.pages[0].meta.total;

  return (
    <RestaurantContext.Provider
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
    </RestaurantContext.Provider>
  );
}

import { createContext, useMemo, useState } from "react";

import { useMediaQuery } from "@mui/material";
import { differenceInDays, format } from "date-fns";
import { getDistance } from "geolib";
import { useCookies } from "react-cookie";
import { useSearchParams } from "react-router-dom";

import { useCategoryFilters } from "@/hooks/contexts/useCategoryFilters";
import { useGetRestaurants } from "@/hooks/react-query/public/restaurants/useGetRestaurants";
import { ratings } from "@/lib/data";
import { RestaurantListItem, RestaurantSearchOption } from "@/types";

type RestaurantProviderProps = {
  children: React.ReactNode;
};

type RestaurantContext = {
  originalRestaurants: RestaurantListItem[];
  restaurants: RestaurantListItem[];
  filteredRestaurantsWithoutMov: RestaurantListItem[];
  isRestaurantsLoading: boolean;
  restaurantsError: Error | null;
  viewMap: boolean;
  isMapViewMobile: boolean;
  selectedOption: RestaurantSearchOption | string | null;
  setViewMap: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedOption: React.Dispatch<
    React.SetStateAction<RestaurantSearchOption | string | null>
  >;
};

export const RestaurantContext = createContext<RestaurantContext | null>(null);

export default function RestaurantProvider({
  children,
}: RestaurantProviderProps) {
  const { allCategories } = useCategoryFilters();

  const [searchParams] = useSearchParams();
  const [cookies] = useCookies(["address"]);
  const [viewMap, setViewMap] = useState(false);
  const [selectedOption, setSelectedOption] = useState<
    RestaurantSearchOption | string | null
  >(null);

  const postcode = cookies.address?.address?.postcode;
  const latitude = Number(cookies.address?.lat);
  const longitude = Number(cookies.address?.lon);

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const isMapViewMobile = isMobile && viewMap;

  const {
    data: restaurants = [],
    isLoading: isRestaurantsLoading,
    error: restaurantsError,
  } = useGetRestaurants(postcode);

  const filteredRestaurantsWithoutMov = useMemo(() => {
    let result = [...restaurants];

    const filters = searchParams.getAll("filter");
    const sort = searchParams.get("sort_by");
    const searchTerm = searchParams.get("q");

    // --- Filter params ---

    const filteredCategories = allCategories.some((c) =>
      filters.includes(c.slug),
    );

    if (filteredCategories) {
      result = result.filter((r) =>
        r.categories.some((c) => filters.includes(c.slug)),
      );
    }

    if (filters.includes("open_now")) {
      const dayName = format(new Date(), "EEEE").toUpperCase();
      const currentTime = format(new Date(), "HH:mm");

      result = result.filter((r) =>
        r.delivery_days.some((d) => {
          if (!d.start_time || !d.end_time) return false;

          return (
            d.day === dayName &&
            currentTime >= d.start_time &&
            currentTime <= d.end_time
          );
        }),
      );
    }

    if (filters.includes("new")) {
      result = result.filter(
        (r) => differenceInDays(new Date(), r.created_at) <= 30,
      );
    }

    if (filters.includes("free_delivery")) {
      result = result.filter((r) => r.shipping_cost === 0);
    }

    if (Object.entries(ratings).some(([, v]) => filters.includes(v))) {
      const rating = Object.entries(ratings).find(([, v]) =>
        filters.includes(v),
      )?.[0];

      if (rating) {
        const ratingNumber = Number(rating);

        result = result.filter(
          (r) =>
            r.reviews_avg_rating >= ratingNumber &&
            r.reviews_avg_rating <=
              (ratingNumber === 5 ? ratingNumber : ratingNumber + 1),
        );
      }
    }

    if (filters.includes("with_discounts")) {
      result = result.filter((r) => r.discount);
    }

    // --- Sort params ---

    switch (sort) {
      case "review_rating":
        result = result.sort(
          (a, b) => b.reviews_avg_rating - a.reviews_avg_rating,
        );
        break;

      case "distance":
        if (latitude && longitude) {
          result = result.sort((a, b) => {
            const distA = getDistance(
              { latitude, longitude },
              { latitude: a.latitude, longitude: a.longitude },
            );

            const distB = getDistance(
              { latitude, longitude },
              { latitude: b.latitude, longitude: b.longitude },
            );

            return distA - distB;
          });
        }
        break;

      case "minimum_order_value":
        result = result.sort((a, b) => a.min_amount - b.min_amount);
        break;

      case "delivery_time":
        result = result.sort(
          (a, b) => a.delivery_time_min - b.delivery_time_min,
        );
        break;

      case "delivery_fee":
        result = result.sort((a, b) => a.shipping_cost - b.shipping_cost);
        break;
    }

    // --- Search params ---

    if (searchTerm && selectedOption && typeof selectedOption === "object") {
      switch (selectedOption.type) {
        case "Restaurant":
          result = result.filter((r) =>
            r.name.toLowerCase().includes(selectedOption.label.toLowerCase()),
          );
          break;

        case "Category":
          result = result.filter((r) =>
            r.categories.some((c) => c.id === selectedOption.id),
          );
          break;

        case "Item":
          result = result.filter((r) =>
            r.menu_categories.some((c) =>
              c.menu_items.some((i) =>
                i.name
                  .toLowerCase()
                  .includes(selectedOption.label.toLowerCase()),
              ),
            ),
          );
          break;

        case "Search":
          result = result.filter(
            (r) =>
              r.name
                .toLowerCase()
                .includes(selectedOption.label.toLowerCase()) ||
              r.categories.some((c) =>
                c.name
                  .toLowerCase()
                  .includes(selectedOption.label.toLowerCase()),
              ) ||
              r.menu_categories.some((c) =>
                c.menu_items.some((i) =>
                  i.name
                    .toLowerCase()
                    .includes(selectedOption.label.toLowerCase()),
                ),
              ),
          );
          break;
      }
    }

    return result;
  }, [
    restaurants,
    searchParams,
    latitude,
    longitude,
    allCategories,
    selectedOption,
  ]);

  const filteredRestaurants = useMemo(() => {
    let result = [...filteredRestaurantsWithoutMov];

    const mov = Number(searchParams.get("mov"));

    // --- MOV params ---

    if (mov) {
      result = result.filter((r) => r.min_amount <= mov / 100);
    }

    return result;
  }, [filteredRestaurantsWithoutMov, searchParams]);

  return (
    <RestaurantContext.Provider
      value={{
        originalRestaurants: restaurants,
        restaurants: filteredRestaurants,
        filteredRestaurantsWithoutMov,
        isRestaurantsLoading,
        restaurantsError,
        viewMap,
        isMapViewMobile,
        selectedOption,
        setViewMap,
        setSelectedOption,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
}

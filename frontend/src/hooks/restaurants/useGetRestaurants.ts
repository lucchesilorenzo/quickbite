import { useInfiniteQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { RestaurantWithPagination } from "@/types/restaurant-types";

type GetRestaurants = {
  lat?: string;
  lon?: string;
  filters: string[];
  sortBy: string | null;
  mov: string | null;
  search: string | null;
};

export function useGetRestaurants({
  lat,
  lon,
  filters,
  sortBy,
  mov,
  search,
}: GetRestaurants) {
  return useInfiniteQuery<RestaurantWithPagination>({
    queryKey: ["restaurants", lat, lon, filters, sortBy, mov, search],
    queryFn: ({ pageParam }) => {
      const params = new URLSearchParams();

      if (lat) params.append("lat", lat);
      if (lon) params.append("lon", lon);
      filters.forEach((f) => params.append("filter[]", f));
      if (sortBy) params.append("sort_by", sortBy);
      if (mov) params.append("mov", mov);
      if (search) params.append("q", search);
      if (pageParam) params.append("cursor", pageParam.toString());

      return fetchData(`/restaurants?${params.toString()}`);
    },
    enabled: !!lat && !!lon,
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.restaurants.next_cursor,
  });
}

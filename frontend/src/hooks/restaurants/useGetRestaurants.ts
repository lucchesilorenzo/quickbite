import { useInfiniteQuery } from "@tanstack/react-query";

import { getPublicRestaurants } from "@/api/endpoints/public-restaurants/public-restaurants";
import {
  GetRestaurants200,
  GetRestaurantsMov,
  RestaurantSortBy,
} from "@/api/models";
import api from "@/lib/api-client";

type UseGetRestaurantsOptions = {
  lat?: string;
  lon?: string;
  filters: string[];
  sortBy: RestaurantSortBy | null;
  mov: GetRestaurantsMov | null;
  search: string | null;
};

export function useGetRestaurants({
  lat,
  lon,
  filters,
  sortBy,
  mov,
  search,
}: UseGetRestaurantsOptions) {
  return useInfiniteQuery<GetRestaurants200, Error>({
    queryKey: ["restaurants", lat, lon, filters, sortBy, mov, search],
    queryFn: async ({ pageParam }) => {
      const response = await getPublicRestaurants(api).getRestaurants({
        lat: Number(lat),
        lon: Number(lon),
        "filter[]": filters,
        sort_by: sortBy ?? undefined,
        mov: mov ?? undefined,
        q: search ?? undefined,
        cursor: pageParam?.toString(),
      });

      return response.data;
    },
    enabled: !!lat && !!lon,
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.meta.next_cursor,
  });
}

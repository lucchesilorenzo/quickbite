import { useInfiniteQuery } from "@tanstack/react-query";

import { getPublicRestaurants } from "@/api/backend/endpoints/public-restaurants/public-restaurants";
import {
  GetRestaurants200,
  GetRestaurants500,
  GetRestaurantsMov,
  RestaurantSortBy,
} from "@/api/backend/models";
import api from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

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
  return useInfiniteQuery<GetRestaurants200, ApiError<GetRestaurants500>>({
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

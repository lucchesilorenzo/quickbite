import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { Menu } from "@/types";

export function useGetRestaurantMenu(restaurantId: string, page: number = 1) {
  return useQuery({
    queryKey: ["menu", restaurantId, page],
    queryFn: (): Promise<Menu[]> =>
      fetchData(`/restaurants/${restaurantId}/menu`),
    enabled: !!restaurantId && !!page,
    initialData: [],
  });
}

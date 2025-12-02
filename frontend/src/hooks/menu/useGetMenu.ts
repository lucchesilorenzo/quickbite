import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { Menu } from "@/types/menu.types";

export function useGetMenu(restaurantId: string, page: number = 1) {
  return useQuery({
    queryKey: ["menu", restaurantId, page],
    queryFn: (): Promise<Menu[]> =>
      fetchData(`/restaurants/${restaurantId}/menu`),
    enabled: !!restaurantId && !!page,
  });
}

import { GetMenuResponse } from "@partner/types/menu/menu.api.types";
import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";

export function useGetMenu(restaurantId: string, page: number = 1) {
  return useQuery<GetMenuResponse>({
    queryKey: ["partner-menu", restaurantId, page],
    queryFn: () =>
      fetchData(`/partner/restaurants/${restaurantId}/menu?page=${page}`),
  });
}

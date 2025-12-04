import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { GetMenuResponse } from "@/types/menu/menu.api.types";

export function useGetMenu(restaurantId: string, page: number = 1) {
  return useQuery<GetMenuResponse>({
    queryKey: ["menu", restaurantId, page],
    queryFn: () => fetchData(`/restaurants/${restaurantId}/menu`),
    enabled: !!restaurantId && !!page,
  });
}

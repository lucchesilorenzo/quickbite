import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { GetMenuResponse } from "@/types/menu/menu.api.types";

type UseGetMenuOptions = {
  restaurantId: string;
  page: number;
};

export function useGetMenu({ restaurantId, page = 1 }: UseGetMenuOptions) {
  return useQuery<GetMenuResponse>({
    queryKey: ["menu", restaurantId, page],
    queryFn: () => fetchData(`/restaurants/${restaurantId}/menu`),
    enabled: !!restaurantId && !!page,
  });
}

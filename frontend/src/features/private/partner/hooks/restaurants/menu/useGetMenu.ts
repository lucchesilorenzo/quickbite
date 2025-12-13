import { GetMenuResponse } from "@partner/types/menu/menu.api.types";
import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";

type UseGetMenuOptions = {
  restaurantId: string;
  page?: number;
};

export function useGetMenu({ restaurantId, page = 1 }: UseGetMenuOptions) {
  return useQuery<GetMenuResponse>({
    queryKey: ["partner-menu", restaurantId, page],
    queryFn: () =>
      fetchData(`/partner/restaurants/${restaurantId}/menu?page=${page}`),
  });
}

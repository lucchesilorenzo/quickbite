import { PartnerMenu } from "@partner/types/menu-types";
import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";

export function useGetMenu(restaurantId: string, page: number = 1) {
  return useQuery({
    queryKey: ["partner-menu", restaurantId, page],
    queryFn: (): Promise<PartnerMenu[]> =>
      fetchData(`/partner/restaurants/${restaurantId}/menu?page=${page}`),
  });
}

import { useQuery } from "@tanstack/react-query";

import { PartnerMenu } from "@/features/private/partner/types/menu.types";
import { fetchData } from "@/lib/api-client";

export function useGetMenu(restaurantId: string, page: number = 1) {
  return useQuery({
    queryKey: ["partner-menu", restaurantId, page],
    queryFn: (): Promise<PartnerMenu[]> =>
      fetchData(`/partner/restaurants/${restaurantId}/menu?page=${page}`),
  });
}

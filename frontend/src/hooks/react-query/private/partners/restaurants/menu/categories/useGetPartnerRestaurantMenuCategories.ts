import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { MenuCategory } from "@/types";

export function useGetPartnerRestaurantMenuCategories(restaurantId: string) {
  return useQuery({
    queryKey: ["partner-menu", restaurantId],
    queryFn: (): Promise<MenuCategory[]> =>
      fetchData(`/partner/restaurants/${restaurantId}/menu/categories`),
  });
}

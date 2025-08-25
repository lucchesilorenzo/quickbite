import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { PartnerMenuCategoryWithMenuItemPagination } from "@/types";

export function useGetPartnerRestaurantMenuCategories(
  restaurantId: string,
  page: number = 1,
) {
  return useQuery({
    queryKey: ["partner-menu", restaurantId, page],
    queryFn: (): Promise<PartnerMenuCategoryWithMenuItemPagination[]> =>
      fetchData(
        `/partner/restaurants/${restaurantId}/menu/categories?page=${page}`,
      ),
    initialData: [],
  });
}

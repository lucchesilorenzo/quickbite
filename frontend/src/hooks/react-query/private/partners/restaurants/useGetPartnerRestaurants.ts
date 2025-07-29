import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { RestaurantDetail } from "@/types";

export function useGetPartnerRestaurants() {
  return useQuery({
    queryKey: ["partner-restaurants"],
    queryFn: (): Promise<RestaurantDetail[]> =>
      fetchData("/partner/restaurants"),
  });
}

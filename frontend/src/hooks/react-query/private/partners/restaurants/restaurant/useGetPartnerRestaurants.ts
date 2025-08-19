import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { PartnerRestaurantBase } from "@/types";

export function useGetPartnerRestaurants() {
  return useQuery({
    queryKey: ["partner-restaurants"],
    queryFn: (): Promise<PartnerRestaurantBase[]> =>
      fetchData("/partner/restaurants"),
  });
}

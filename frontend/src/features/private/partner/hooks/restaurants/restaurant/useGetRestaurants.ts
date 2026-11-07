import { useQuery } from "@tanstack/react-query";

import { getPartnerRestaurants } from "@/api/endpoints/partner-restaurants/partner-restaurants";
import { GetPartnerRestaurants200 } from "@/api/models";
import api from "@/lib/api-client";

export function useGetRestaurants() {
  return useQuery<GetPartnerRestaurants200>({
    queryKey: ["partner-restaurants"],
    queryFn: async () => {
      const response = await getPartnerRestaurants(api).getPartnerRestaurants();

      return response.data;
    },
  });
}

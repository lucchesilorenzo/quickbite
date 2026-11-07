import { useQuery } from "@tanstack/react-query";

import { getRiderRestaurant } from "@/api/endpoints/rider-restaurant/rider-restaurant";
import { GetRiderRestaurant200 } from "@/api/models";
import api from "@/lib/api-client";

export function useGetRestaurant() {
  return useQuery<GetRiderRestaurant200>({
    queryKey: ["rider-restaurant"],
    queryFn: async () => {
      const response = await getRiderRestaurant(api).getRiderRestaurant();

      return response.data;
    },
  });
}

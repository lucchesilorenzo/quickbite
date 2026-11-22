import { useQuery } from "@tanstack/react-query";

import { getPartnerRestaurants } from "@/api/backend/endpoints/partner-restaurants/partner-restaurants";
import {
  GetPartnerRestaurants200,
  GetPartnerRestaurants500,
} from "@/api/backend/models";
import api from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

export function useGetRestaurants() {
  return useQuery<GetPartnerRestaurants200, ApiError<GetPartnerRestaurants500>>(
    {
      queryKey: ["partner-restaurants"],
      queryFn: async () => {
        const response =
          await getPartnerRestaurants(api).getPartnerRestaurants();

        return response.data;
      },
    },
  );
}

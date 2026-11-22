import { useQuery } from "@tanstack/react-query";

import { getRiderRestaurant } from "@/api/backend/endpoints/rider-restaurant/rider-restaurant";
import {
  GetRiderRestaurant200,
  GetRiderRestaurant404,
  GetRiderRestaurant500,
} from "@/api/backend/models";
import api from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

export function useGetRestaurant() {
  return useQuery<
    GetRiderRestaurant200,
    ApiError<GetRiderRestaurant404 | GetRiderRestaurant500>
  >({
    queryKey: ["rider-restaurant"],
    queryFn: async () => {
      const response = await getRiderRestaurant(api).getRiderRestaurant();

      return response.data;
    },
  });
}

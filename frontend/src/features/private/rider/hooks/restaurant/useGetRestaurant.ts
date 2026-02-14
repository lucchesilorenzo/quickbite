import { useQuery } from "@tanstack/react-query";

import { GetRestaurantResponse } from "../../types/restaurant/restaurant.api.types";

import { fetchData } from "@/lib/api-client";

export function useGetRestaurant() {
  return useQuery<GetRestaurantResponse>({
    queryKey: ["rider-restaurant"],
    queryFn: () => fetchData("/rider/restaurant"),
  });
}

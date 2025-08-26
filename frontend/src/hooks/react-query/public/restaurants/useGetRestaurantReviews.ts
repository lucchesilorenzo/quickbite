import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { ReviewStats } from "@/types";

export function useGetRestaurantReviews(
  restaurantId: string,
  page: number = 1,
) {
  return useQuery({
    queryKey: ["reviews", restaurantId, page],
    queryFn: (): Promise<ReviewStats> =>
      fetchData(`/restaurants/${restaurantId}/reviews?page=${page}`),
  });
}

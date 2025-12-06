import { GetOffersResponse } from "@partner/types/offers/offer.api.types";
import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";

type UseGetOffersOptions = {
  restaurantId: string;
  page: number;
};

export function useGetOffers({ restaurantId, page = 1 }: UseGetOffersOptions) {
  return useQuery<GetOffersResponse>({
    queryKey: ["partner-offers", restaurantId, page],
    queryFn: () =>
      fetchData(`/partner/restaurants/${restaurantId}/offers?page=${page}`),
  });
}

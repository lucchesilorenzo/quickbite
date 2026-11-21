import { useQuery } from "@tanstack/react-query";

import { getPartnerMenu } from "@/api/endpoints/partner-menu/partner-menu";
import { GetPartnerMenu200, GetPartnerMenu500 } from "@/api/models";
import api from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

type UseGetMenuOptions = {
  restaurantId: string;
  page?: number;
};

export function useGetMenu({ restaurantId, page = 1 }: UseGetMenuOptions) {
  return useQuery<GetPartnerMenu200, ApiError<GetPartnerMenu500>>({
    queryKey: ["partner-menu", restaurantId, page],
    queryFn: async () => {
      const response = await getPartnerMenu(api).getPartnerMenu(restaurantId, {
        page,
      });

      return response.data;
    },
  });
}

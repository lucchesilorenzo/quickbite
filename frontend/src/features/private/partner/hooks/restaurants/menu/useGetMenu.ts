import { useQuery } from "@tanstack/react-query";

import { getPartnerMenu } from "@/api/endpoints/partner-menu/partner-menu";
import { GetPartnerMenu200 } from "@/api/models";
import api from "@/lib/api-client";

type UseGetMenuOptions = {
  restaurantId: string;
  page?: number;
};

export function useGetMenu({ restaurantId, page = 1 }: UseGetMenuOptions) {
  return useQuery<GetPartnerMenu200>({
    queryKey: ["partner-menu", restaurantId, page],
    queryFn: async () => {
      const response = await getPartnerMenu(api).getPartnerMenu(restaurantId, {
        page,
      });

      return response.data;
    },
  });
}

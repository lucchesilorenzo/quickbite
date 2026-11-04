import { useQuery } from "@tanstack/react-query";

import { getPublicMenu } from "@/api/endpoints/public-menu/public-menu";
import { GetMenu200 } from "@/api/models";
import api from "@/lib/api-client";

type UseGetMenuOptions = {
  restaurantId: string;
  page: number;
};

export function useGetMenu({ restaurantId, page = 1 }: UseGetMenuOptions) {
  return useQuery<GetMenu200>({
    queryKey: ["menu", restaurantId, page],
    queryFn: async () => {
      const response = await getPublicMenu(api).getMenu(restaurantId);

      return response.data;
    },
    enabled: !!restaurantId && !!page,
  });
}

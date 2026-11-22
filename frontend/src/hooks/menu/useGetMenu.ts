import { useQuery } from "@tanstack/react-query";

import { getPublicMenu } from "@/api/backend/endpoints/public-menu/public-menu";
import { GetMenu200, GetMenu500 } from "@/api/backend/models";
import api from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

type UseGetMenuOptions = {
  restaurantId: string;
  page: number;
};

export function useGetMenu({ restaurantId, page = 1 }: UseGetMenuOptions) {
  return useQuery<GetMenu200, ApiError<GetMenu500>>({
    queryKey: ["menu", restaurantId, page],
    queryFn: async () => {
      const response = await getPublicMenu(api).getMenu(restaurantId);

      return response.data;
    },
    enabled: !!restaurantId && !!page,
  });
}

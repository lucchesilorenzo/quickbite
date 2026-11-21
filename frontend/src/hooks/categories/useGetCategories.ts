import { useQuery } from "@tanstack/react-query";

import { getPublicCategories } from "@/api/endpoints/public-categories/public-categories";
import { GetCategories200, GetCategories500 } from "@/api/models";
import api from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

export function useGetCategories() {
  return useQuery<GetCategories200, ApiError<GetCategories500>>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await getPublicCategories(api).getCategories();

      return response.data;
    },
  });
}

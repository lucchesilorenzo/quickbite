import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { GetCategoriesResponse } from "@/types/category/category.api.types";

export function useGetCategories() {
  return useQuery<GetCategoriesResponse>({
    queryKey: ["categories"],
    queryFn: () => fetchData("/categories"),
  });
}

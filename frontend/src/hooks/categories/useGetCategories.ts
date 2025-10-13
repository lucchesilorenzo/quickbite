import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { Category } from "@/types/category-types";

export function useGetCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: (): Promise<Category[]> => fetchData("/categories"),
  });
}

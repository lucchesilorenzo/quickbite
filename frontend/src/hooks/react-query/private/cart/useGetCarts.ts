import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { Cart } from "@/types";

export function useGetCarts() {
  return useQuery({
    queryKey: ["carts"],
    queryFn: (): Promise<Cart> => fetchData("/carts"),
  });
}

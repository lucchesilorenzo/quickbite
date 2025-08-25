import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { RestaurantCart } from "@/types";

export function useGetCarts(customer: boolean) {
  return useQuery({
    queryKey: ["carts"],
    queryFn: (): Promise<RestaurantCart[]> => fetchData("/customer/carts"),
    enabled: !!customer,
  });
}

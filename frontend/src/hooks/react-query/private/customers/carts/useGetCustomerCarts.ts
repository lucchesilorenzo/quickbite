import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { RestaurantCart } from "@/types";

export function useGetCustomerCarts(isCustomer: boolean) {
  return useQuery({
    queryKey: ["customer-carts"],
    queryFn: (): Promise<RestaurantCart[]> => fetchData("/customer/carts"),
    enabled: !!isCustomer,
    initialData: [],
  });
}

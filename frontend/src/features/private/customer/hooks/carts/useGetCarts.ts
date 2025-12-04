import { useQuery } from "@tanstack/react-query";

import { GetCartsResponse } from "../../types/cart/cart.api.types";

import { fetchData } from "@/lib/api-client";

export function useGetCarts(isCustomer: boolean) {
  return useQuery<GetCartsResponse>({
    queryKey: ["customer-carts"],
    queryFn: () => fetchData("/customer/carts"),
    enabled: !!isCustomer,
  });
}

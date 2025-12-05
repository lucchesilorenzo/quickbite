import { useQuery } from "@tanstack/react-query";

import { GetCartsResponse } from "../../types/cart/cart.api.types";

import { fetchData } from "@/lib/api-client";

type UseGetCartsOptions = {
  isCustomer: boolean;
};

export function useGetCarts({ isCustomer }: UseGetCartsOptions) {
  return useQuery<GetCartsResponse>({
    queryKey: ["customer-carts"],
    queryFn: () => fetchData("/customer/carts"),
    enabled: !!isCustomer,
  });
}

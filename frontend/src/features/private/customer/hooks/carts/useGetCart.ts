import { useQuery } from "@tanstack/react-query";

import { GetCartResponse } from "../../types/cart/cart.api.types";

import { fetchData } from "@/lib/api-client";

export function useGetCart(cartId?: string) {
  return useQuery<GetCartResponse>({
    queryKey: ["customer-carts", cartId],
    queryFn: () => fetchData(`/customer/carts/${cartId}`),
    enabled: !!cartId,
  });
}

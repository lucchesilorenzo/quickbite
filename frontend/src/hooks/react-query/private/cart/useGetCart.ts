import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { Cart } from "@/types";

export function useGetCart(cartId?: string) {
  return useQuery({
    queryKey: ["cart", cartId],
    queryFn: (): Promise<Cart> => fetchData(`/carts/${cartId}`),
  });
}

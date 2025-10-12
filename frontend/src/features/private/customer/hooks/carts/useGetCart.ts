import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { RestaurantCart } from "@/types/cart-types";

export function useGetCart(cartId?: string) {
  return useQuery({
    queryKey: ["customer-carts", cartId],
    queryFn: (): Promise<RestaurantCart> =>
      fetchData(`/customer/carts/${cartId}`),
    enabled: !!cartId,
  });
}

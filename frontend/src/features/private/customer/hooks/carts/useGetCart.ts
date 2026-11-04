import { useQuery } from "@tanstack/react-query";

import { getCustomerCarts } from "@/api/endpoints/customer-carts/customer-carts";
import { GetCustomerCart200 } from "@/api/models";
import api from "@/lib/api-client";

type UseGetCartOptions = {
  cartId?: string;
};

export function useGetCart({ cartId }: UseGetCartOptions) {
  return useQuery<GetCustomerCart200>({
    queryKey: ["customer-carts", cartId],
    queryFn: async () => {
      const response = await getCustomerCarts(api).getCustomerCart(
        cartId ?? "",
      );

      return response.data;
    },
    enabled: !!cartId,
  });
}

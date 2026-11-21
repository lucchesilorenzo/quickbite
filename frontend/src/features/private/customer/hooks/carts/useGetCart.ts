import { useQuery } from "@tanstack/react-query";

import { getCustomerCarts } from "@/api/endpoints/customer-carts/customer-carts";
import {
  GetCustomerCart200,
  GetCustomerCart404,
  GetCustomerCart500,
} from "@/api/models";
import api from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

type UseGetCartOptions = {
  cartId?: string;
};

export function useGetCart({ cartId }: UseGetCartOptions) {
  return useQuery<
    GetCustomerCart200,
    ApiError<GetCustomerCart404 | GetCustomerCart500>
  >({
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

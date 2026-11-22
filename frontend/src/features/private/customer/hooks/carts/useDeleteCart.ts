import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { getCustomerCarts } from "@/api/backend/endpoints/customer-carts/customer-carts";
import {
  DeleteCustomerCart200,
  DeleteCustomerCart404,
  DeleteCustomerCart500,
} from "@/api/backend/models";
import api from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

type UseDeleteCartOptions = {
  cartId?: string;
};

export function useDeleteCart({ cartId }: UseDeleteCartOptions) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<
    DeleteCustomerCart200,
    ApiError<DeleteCustomerCart404 | DeleteCustomerCart500>,
    void
  >({
    mutationFn: async () => {
      const response = await getCustomerCarts(api).deleteCustomerCart(
        cartId ?? "",
      );

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customer-carts"] });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "customer-delete-cart-error",
        severity: "error",
      });
    },
  });
}

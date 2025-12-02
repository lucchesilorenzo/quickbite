import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { deleteData } from "@/lib/api-client";
import { ApiResponse } from "@/types/api.types";

export function useDeleteCart(cartId?: string) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<ApiResponse>({
    mutationFn: () => deleteData(`/customer/carts/${cartId}`),
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

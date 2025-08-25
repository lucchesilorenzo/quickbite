import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { deleteData } from "@/lib/api-client";

export function useDeleteCart(cartId?: string) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation({
    mutationFn: () => deleteData(`/customer/carts/${cartId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "delete-cart-error",
        severity: "error",
      });
    },
  });
}

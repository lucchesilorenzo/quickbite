import { useMutation } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { deleteData } from "@/lib/api-client";

export function useDeleteCart(cartId?: string) {
  const notifications = useNotifications();

  return useMutation({
    mutationFn: () => deleteData(`/carts/${cartId}`),
    onError: (error) => {
      notifications.show(error.message, {
        key: "delete-cart-error",
        severity: "error",
      });
    },
  });
}

import { useMutation } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { postData } from "@/lib/api-client";
import { RestaurantCart } from "@/types";

export function useCreateOrUpdateCart() {
  const notifications = useNotifications();

  return useMutation({
    mutationFn: (data: RestaurantCart) => postData("/carts", data),

    onError: () => {
      notifications.show("Failed to create or update cart.", {
        key: "create-or-update-cart-error",
        severity: "error",
      });
    },
  });
}

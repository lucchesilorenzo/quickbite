import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { postData } from "@/lib/api-client";
import { RestaurantCart } from "@/types";

export function useCreateOrUpdateCarts() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation({
    mutationFn: (data: RestaurantCart[]) =>
      postData("/customer/carts/bulk", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customer-carts"] });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "customer-create-or-update-carts-error",
        severity: "error",
      });
    },
  });
}

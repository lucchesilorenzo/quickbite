import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { postData } from "@/lib/api-client";
import { RestaurantCart } from "@/types";

export function useCreateOrUpdateCustomerCarts() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation({
    mutationFn: (data: RestaurantCart[]) =>
      postData("/customer/carts/bulk", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customer-carts"] });
    },
    onError: () => {
      notifications.show("Failed to create or update carts.", {
        key: "create-or-update-customer-carts-error",
        severity: "error",
      });
    },
  });
}

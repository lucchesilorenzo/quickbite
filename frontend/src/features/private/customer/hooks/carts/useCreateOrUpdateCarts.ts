import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import {
  CreateOrUpdateCartsPayload,
  CreateOrUpdateCartsResponse,
} from "../../types/cart/cart.api.types";

import { postData } from "@/lib/api-client";

export function useCreateOrUpdateCarts() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<
    CreateOrUpdateCartsResponse,
    Error,
    CreateOrUpdateCartsPayload
  >({
    mutationFn: (data) => postData("/customer/carts/bulk", data),
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

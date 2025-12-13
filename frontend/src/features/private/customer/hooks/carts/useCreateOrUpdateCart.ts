import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import {
  CreateOrUpdateCartPayload,
  CreateOrUpdateCartResponse,
} from "../../types/carts/cart.api.types";

import { postData } from "@/lib/api-client";

export function useCreateOrUpdateCart() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<
    CreateOrUpdateCartResponse,
    Error,
    CreateOrUpdateCartPayload
  >({
    mutationFn: (data) => postData("/customer/carts", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customer-carts"] });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "customer-create-or-update-cart-error",
        severity: "error",
      });
    },
  });
}

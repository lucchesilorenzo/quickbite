import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { getCustomerCarts } from "@/api/endpoints/customer-carts/customer-carts";
import {
  CreateOrUpdateCustomerCart200,
  CreateOrUpdateCustomerCart201,
} from "@/api/models";
import api from "@/lib/api-client";
import { RestaurantCart } from "@/types/cart.types";

export function useCreateOrUpdateCart() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<
    CreateOrUpdateCustomerCart200 | CreateOrUpdateCustomerCart201,
    Error,
    RestaurantCart
  >({
    mutationFn: async (data) => {
      const response =
        await getCustomerCarts(api).createOrUpdateCustomerCart(data);

      return response.data;
    },
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

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { getCustomerCarts } from "@/api/backend/endpoints/customer-carts/customer-carts";
import {
  CreateOrUpdateCustomerCart200,
  CreateOrUpdateCustomerCart201,
  CreateOrUpdateCustomerCart500,
} from "@/api/backend/models";
import api from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";
import { RestaurantCart } from "@/types/cart.types";

export function useCreateOrUpdateCart() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<
    CreateOrUpdateCustomerCart200 | CreateOrUpdateCustomerCart201,
    ApiError<CreateOrUpdateCustomerCart500>,
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

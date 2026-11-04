import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { getCustomerCarts } from "@/api/endpoints/customer-carts/customer-carts";
import { CreateOrUpdateCustomerCarts200 } from "@/api/models";
import api from "@/lib/api-client";
import { RestaurantCart } from "@/types/cart.types";

export function useCreateOrUpdateCarts() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<CreateOrUpdateCustomerCarts200, Error, RestaurantCart[]>({
    mutationFn: async (data) => {
      const response =
        await getCustomerCarts(api).createOrUpdateCustomerCarts(data);

      return response.data;
    },
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

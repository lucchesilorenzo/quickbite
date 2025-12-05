import {
  UpdateMenuCategoriesOrderPayload,
  UpdateMenuCategoriesOrderResponse,
} from "@partner/types/menu/menu.api.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { updateData } from "@/lib/api-client";

type UseUpdateMenuCategoriesOrderOptions = {
  restaurantId: string;
};

export function useUpdateMenuCategoriesOrder({
  restaurantId,
}: UseUpdateMenuCategoriesOrderOptions) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<
    UpdateMenuCategoriesOrderResponse,
    Error,
    UpdateMenuCategoriesOrderPayload
  >({
    mutationFn: (data) =>
      updateData(`/partner/restaurants/menu/categories/order`, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-menu", restaurantId],
      });

      notifications.show(response.message, {
        key: "partner-update-menu-categories-order-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "partner-update-menu-categories-order-error",
        severity: "error",
      });
    },
  });
}

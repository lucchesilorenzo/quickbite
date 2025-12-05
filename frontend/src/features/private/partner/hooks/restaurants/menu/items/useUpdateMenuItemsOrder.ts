import {
  UpdateMenuItemsOrderPayload,
  UpdateMenuItemsOrderResponse,
} from "@partner/types/menu/menu.api.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { updateData } from "@/lib/api-client";

type UseUpdateMenuItemsOrderOptions = {
  restaurantId: string;
};

export function useUpdateMenuItemsOrder({
  restaurantId,
}: UseUpdateMenuItemsOrderOptions) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<
    UpdateMenuItemsOrderResponse,
    Error,
    UpdateMenuItemsOrderPayload
  >({
    mutationFn: (data) =>
      updateData(`/partner/restaurants/menu/items/order`, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-menu", restaurantId],
      });

      notifications.show(response.message, {
        key: "partner-update-menu-items-order-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "partner-update-menu-items-order-error",
        severity: "error",
      });
    },
  });
}

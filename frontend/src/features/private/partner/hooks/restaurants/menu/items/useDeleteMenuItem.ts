import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { deleteData } from "@/lib/api-client";

export function useDeleteMenuItem(restaurantId: string, menuItemId: string) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation({
    mutationFn: () =>
      deleteData(`/partner/restaurants/menu/items/${menuItemId}`),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-menu", restaurantId],
      });

      notifications.show(response.message, {
        key: "partner-delete-menu-item-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "partner-delete-menu-item-error",
        severity: "error",
      });
    },
  });
}

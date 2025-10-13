import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { postData } from "@/lib/api-client";

export function useCreateMenuItem(
  restaurantId: string,
  menuCategoryId: string,
) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation({
    mutationFn: (data: FormData) =>
      postData(
        `/partner/restaurants/menu/categories/${menuCategoryId}/items`,
        data,
      ),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-menu", restaurantId],
      });

      notifications.show(response.message, {
        key: "partner-menu-item-create-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "partner-menu-item-create-error",
        severity: "error",
      });
    },
  });
}

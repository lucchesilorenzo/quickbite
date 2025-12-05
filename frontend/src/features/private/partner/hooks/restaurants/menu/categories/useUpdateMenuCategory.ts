import {
  UpdateMenuCategoryPayload,
  UpdateMenuCategoryResponse,
} from "@partner/types/menu/menu.api.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { updateData } from "@/lib/api-client";

type UseUpdateMenuCategoryOptions = {
  restaurantId: string;
  menuCategoryId: string;
};

export function useUpdateMenuCategory({
  restaurantId,
  menuCategoryId,
}: UseUpdateMenuCategoryOptions) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<
    UpdateMenuCategoryResponse,
    Error,
    UpdateMenuCategoryPayload
  >({
    mutationFn: (data) =>
      updateData(
        `/partner/restaurants/menu/categories/${menuCategoryId}`,
        data,
      ),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-menu", restaurantId],
      });

      notifications.show(response.message, {
        key: "partner-update-menu-category-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "partner-update-menu-category-error",
        severity: "error",
      });
    },
  });
}

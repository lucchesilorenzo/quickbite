import {
  CreateMenuItemPayload,
  CreateMenuItemResponse,
} from "@partner/types/menu/menu.api.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { postData } from "@/lib/api-client";

type UseCreateMenuItemOptions = {
  restaurantId: string;
  menuCategoryId: string;
};

export function useCreateMenuItem({
  restaurantId,
  menuCategoryId,
}: UseCreateMenuItemOptions) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<CreateMenuItemResponse, Error, CreateMenuItemPayload>({
    mutationFn: (data) =>
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

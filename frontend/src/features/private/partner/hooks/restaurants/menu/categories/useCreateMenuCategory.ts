import {
  CreateMenuCategoryPayload,
  CreateMenuCategoryResponse,
} from "@partner/types/menu/menu.api.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { postData } from "@/lib/api-client";

type UseCreateMenuCategoryOptions = {
  restaurantId: string;
};

export function useCreateMenuCategory({
  restaurantId,
}: UseCreateMenuCategoryOptions) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<
    CreateMenuCategoryResponse,
    Error,
    CreateMenuCategoryPayload
  >({
    mutationFn: (data) =>
      postData(`/partner/restaurants/${restaurantId}/menu/categories`, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-menu", restaurantId],
      });

      notifications.show(response.message, {
        key: "partner-menu-category-create-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "partner-menu-category-create-error",
        severity: "error",
      });
    },
  });
}

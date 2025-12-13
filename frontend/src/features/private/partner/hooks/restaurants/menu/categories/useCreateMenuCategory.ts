import {
  CreateMenuCategoryPayload,
  CreateMenuCategoryResponse,
} from "@partner/types/menu/menu.api.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { postData } from "@/lib/api-client";

type UseCreateMenuCategoryOptions = {
  restaurantId: string;
  setOpenAddMenuCategoryDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export function useCreateMenuCategory({
  restaurantId,
  setOpenAddMenuCategoryDialog,
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

      setOpenAddMenuCategoryDialog(false);

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

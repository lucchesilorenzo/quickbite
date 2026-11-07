import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { getPartnerMenuCategories } from "@/api/endpoints/partner-menu-categories/partner-menu-categories";
import {
  UpdateMenuCategoryRequest,
  UpdatePartnerMenuCategory200,
} from "@/api/models";
import api from "@/lib/api-client";

type UseUpdateMenuCategoryOptions = {
  restaurantId: string;
  menuCategoryId: string;
  setOpenEditMenuCategoryDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export function useUpdateMenuCategory({
  restaurantId,
  menuCategoryId,
  setOpenEditMenuCategoryDialog,
}: UseUpdateMenuCategoryOptions) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<
    UpdatePartnerMenuCategory200,
    Error,
    UpdateMenuCategoryRequest
  >({
    mutationFn: async (data) => {
      const response = await getPartnerMenuCategories(
        api,
      ).updatePartnerMenuCategory(menuCategoryId, data);

      return response.data;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-menu", restaurantId],
      });

      setOpenEditMenuCategoryDialog(false);

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

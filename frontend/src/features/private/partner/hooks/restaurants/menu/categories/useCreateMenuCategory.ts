import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { getPartnerMenuCategories } from "@/api/endpoints/partner-menu-categories/partner-menu-categories";
import {
  CreateMenuCategoryRequest,
  CreatePartnerMenuCategory201,
} from "@/api/models";
import api from "@/lib/api-client";

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
    CreatePartnerMenuCategory201,
    Error,
    CreateMenuCategoryRequest
  >({
    mutationFn: async (data) => {
      const response = await getPartnerMenuCategories(
        api,
      ).createPartnerMenuCategory(restaurantId, data);

      return response.data;
    },
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

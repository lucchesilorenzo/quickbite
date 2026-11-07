import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { getPartnerMenuCategories } from "@/api/endpoints/partner-menu-categories/partner-menu-categories";
import { DeletePartnerMenuCategory200 } from "@/api/models";
import api from "@/lib/api-client";

type UseDeleteMenuCategoryOptions = {
  restaurantId: string;
  menuCategoryId: string;
};

export function useDeleteMenuCategory({
  restaurantId,
  menuCategoryId,
}: UseDeleteMenuCategoryOptions) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<DeletePartnerMenuCategory200, Error, void>({
    mutationFn: async () => {
      const response =
        await getPartnerMenuCategories(api).deletePartnerMenuCategory(
          menuCategoryId,
        );

      return response.data;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-menu", restaurantId],
      });

      notifications.show(response.message, {
        key: "partner-delete-menu-category-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "partner-delete-menu-category-error",
        severity: "error",
      });
    },
  });
}

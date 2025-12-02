import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { TAddMenuCategoryFormSchema } from "@/features/private/partner/schemas/menu.schema";
import { postData } from "@/lib/api-client";

export function useCreateMenuCategory(restaurantId: string) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation({
    mutationFn: (data: TAddMenuCategoryFormSchema) =>
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

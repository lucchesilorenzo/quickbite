import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { PartnerMenu } from "@/features/private/partner/types/menu.types";
import { updateData } from "@/lib/api-client";

export function useUpdateMenuCategoriesOrder(restaurantId: string) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation({
    mutationFn: (data: PartnerMenu[]) =>
      updateData(`/partner/restaurants/menu/categories/order`, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-menu", restaurantId],
      });

      notifications.show(response.message, {
        key: "partner-update-menu-categories-order-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "partner-update-menu-categories-order-error",
        severity: "error",
      });
    },
  });
}

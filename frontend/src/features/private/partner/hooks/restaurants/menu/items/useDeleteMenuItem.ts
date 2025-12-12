import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { deleteData } from "@/lib/api-client";
import { ApiResponse } from "@/types/api.types";

type UseDeleteMenuItemOptions = {
  restaurantId: string;
  menuItemId: string;
  setOpenDeleteMenuItemDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export function useDeleteMenuItem({
  restaurantId,
  menuItemId,
  setOpenDeleteMenuItemDialog,
}: UseDeleteMenuItemOptions) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<ApiResponse>({
    mutationFn: () =>
      deleteData(`/partner/restaurants/menu/items/${menuItemId}`),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-menu", restaurantId],
      });

      setOpenDeleteMenuItemDialog(false);

      notifications.show(response.message, {
        key: "partner-delete-menu-item-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "partner-delete-menu-item-error",
        severity: "error",
      });
    },
  });
}

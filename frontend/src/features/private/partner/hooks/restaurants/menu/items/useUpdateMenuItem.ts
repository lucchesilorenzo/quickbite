import {
  UpdateMenuItemPayload,
  UpdateMenuItemResponse,
} from "@partner/types/menu/menu.api.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { postData } from "@/lib/api-client";

type UseUpdateMenuItemOptions = {
  restaurantId: string;
  menuItemId: string;
  setOpenEditMenuItemDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export function useUpdateMenuItem({
  restaurantId,
  menuItemId,
  setOpenEditMenuItemDialog,
}: UseUpdateMenuItemOptions) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<UpdateMenuItemResponse, Error, UpdateMenuItemPayload>({
    mutationFn: (data) =>
      postData(`/partner/restaurants/menu/items/${menuItemId}`, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-menu", restaurantId],
      });

      setOpenEditMenuItemDialog(false);

      notifications.show(response.message, {
        key: "partner-update-menu-item-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "partner-update-menu-item-error",
        severity: "error",
      });
    },
  });
}

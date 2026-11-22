import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { getPartnerMenuItems } from "@/api/backend/endpoints/partner-menu-items/partner-menu-items";
import {
  DeletePartnerMenuItem200,
  DeletePartnerMenuItem500,
} from "@/api/backend/models";
import api from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

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

  return useMutation<
    DeletePartnerMenuItem200,
    ApiError<DeletePartnerMenuItem500>,
    void
  >({
    mutationFn: async () => {
      const response =
        await getPartnerMenuItems(api).deletePartnerMenuItem(menuItemId);

      return response.data;
    },
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

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { getPartnerMenuItems } from "@/api/endpoints/partner-menu-items/partner-menu-items";
import { UpdateMenuItemRequest, UpdatePartnerMenuItem200 } from "@/api/models";
import api from "@/lib/api-client";

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

  return useMutation<UpdatePartnerMenuItem200, Error, UpdateMenuItemRequest>({
    mutationFn: async (data) => {
      const response = await getPartnerMenuItems(api).updatePartnerMenuItem(
        menuItemId,
        data,
      );

      return response.data;
    },
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

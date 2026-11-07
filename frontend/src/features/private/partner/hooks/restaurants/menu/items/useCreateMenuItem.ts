import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { getPartnerMenuItems } from "@/api/endpoints/partner-menu-items/partner-menu-items";
import { CreateMenuItemRequest, CreatePartnerMenuItem201 } from "@/api/models";
import api from "@/lib/api-client";

type UseCreateMenuItemOptions = {
  restaurantId: string;
  menuCategoryId: string;
  setOpenAddMenuItemDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export function useCreateMenuItem({
  restaurantId,
  menuCategoryId,
  setOpenAddMenuItemDialog,
}: UseCreateMenuItemOptions) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<CreatePartnerMenuItem201, Error, CreateMenuItemRequest>({
    mutationFn: async (data) => {
      const response = await getPartnerMenuItems(api).createPartnerMenuItem(
        menuCategoryId,
        data,
      );

      return response.data;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-menu", restaurantId],
      });

      setOpenAddMenuItemDialog(false);

      notifications.show(response.message, {
        key: "partner-menu-item-create-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "partner-menu-item-create-error",
        severity: "error",
      });
    },
  });
}

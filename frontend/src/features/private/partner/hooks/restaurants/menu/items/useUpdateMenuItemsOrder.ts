import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { getPartnerMenuItems } from "@/api/endpoints/partner-menu-items/partner-menu-items";
import {
  UpdateMenuItemsOrderRequest,
  UpdatePartnerMenuItemsOrder200,
  UpdatePartnerMenuItemsOrder404,
  UpdatePartnerMenuItemsOrder500,
} from "@/api/models";
import api from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

type UseUpdateMenuItemsOrderOptions = {
  restaurantId: string;
};

export function useUpdateMenuItemsOrder({
  restaurantId,
}: UseUpdateMenuItemsOrderOptions) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<
    UpdatePartnerMenuItemsOrder200,
    ApiError<UpdatePartnerMenuItemsOrder404 | UpdatePartnerMenuItemsOrder500>,
    UpdateMenuItemsOrderRequest
  >({
    mutationFn: async (data) => {
      const response =
        await getPartnerMenuItems(api).updatePartnerMenuItemsOrder(data);

      return response.data;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-menu", restaurantId],
      });

      notifications.show(response.message, {
        key: "partner-update-menu-items-order-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "partner-update-menu-items-order-error",
        severity: "error",
      });
    },
  });
}

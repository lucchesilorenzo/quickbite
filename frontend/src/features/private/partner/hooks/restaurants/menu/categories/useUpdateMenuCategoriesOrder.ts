import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { getPartnerMenuCategories } from "@/api/endpoints/partner-menu-categories/partner-menu-categories";
import {
  UpdateMenuCategoriesOrderRequest,
  UpdatePartnerMenuCategoriesOrder200,
  UpdatePartnerMenuCategoriesOrder404,
  UpdatePartnerMenuCategoriesOrder500,
} from "@/api/models";
import api from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

type UseUpdateMenuCategoriesOrderOptions = {
  restaurantId: string;
};

export function useUpdateMenuCategoriesOrder({
  restaurantId,
}: UseUpdateMenuCategoriesOrderOptions) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<
    UpdatePartnerMenuCategoriesOrder200,
    ApiError<
      UpdatePartnerMenuCategoriesOrder404 | UpdatePartnerMenuCategoriesOrder500
    >,
    UpdateMenuCategoriesOrderRequest
  >({
    mutationFn: async (data) => {
      const response =
        await getPartnerMenuCategories(api).updatePartnerMenuCategoriesOrder(
          data,
        );

      return response.data;
    },
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

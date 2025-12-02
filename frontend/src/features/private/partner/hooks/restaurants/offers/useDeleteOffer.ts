import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { deleteData } from "@/lib/api-client";
import { ApiResponse } from "@/types/api.types";

export function useDeleteOffer(restaurantId: string, offerId: string) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<ApiResponse>({
    mutationFn: () => deleteData(`/partner/restaurants/offers/${offerId}`),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-offers", restaurantId],
      });

      notifications.show(response.message, {
        key: "partner-delete-offer-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "partner-delete-offer-error",
        severity: "error",
      });
    },
  });
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { deleteData } from "@/lib/api-client";

export function useDeletePartnerRestaurantOffer(
  restaurantId: string,
  offerId: string,
) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation({
    mutationFn: () => deleteData(`/partner/restaurants/offers/${offerId}`),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-restaurant", restaurantId],
      });

      notifications.show(response.message, {
        key: "delete-restaurant-offer-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "delete-restaurant-offer-error",
        severity: "error",
      });
    },
  });
}

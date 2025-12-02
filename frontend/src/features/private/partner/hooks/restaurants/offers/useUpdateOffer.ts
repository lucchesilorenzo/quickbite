import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { TRestaurantSettingsOffersFormSchema } from "@/features/private/partner/schemas/restaurant-settings.schema";
import { updateData } from "@/lib/api-client";

export function useUpdateOffer(restaurantId: string, offerId: string) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation({
    mutationFn: (data: TRestaurantSettingsOffersFormSchema) =>
      updateData(
        `/partner/restaurants/${restaurantId}/offers/${offerId}`,
        data,
      ),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-offers", restaurantId],
      });

      notifications.show(response.message, {
        key: "partner-update-offer-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "partner-update-offer-error",
        severity: "error",
      });
    },
  });
}

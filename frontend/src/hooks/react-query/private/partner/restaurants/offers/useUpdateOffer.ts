import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { updateData } from "@/lib/api-client";
import { TRestaurantSettingsOffersFormSchema } from "@/validations/private/partner/restaurant-settings-validations";

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

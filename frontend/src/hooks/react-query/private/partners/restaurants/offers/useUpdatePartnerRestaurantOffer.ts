import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { updateData } from "@/lib/api-client";
import { TPartnerRestaurantSettingsOffersFormSchema } from "@/validations/partner-restaurant-settings-validations";

export function useUpdatePartnerRestaurantOffer(
  restaurantId: string,
  offerId: string,
) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation({
    mutationFn: (data: TPartnerRestaurantSettingsOffersFormSchema) =>
      updateData(
        `/partner/restaurants/${restaurantId}/offers/${offerId}`,
        data,
      ),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-offers", restaurantId],
      });

      notifications.show(response.message, {
        key: "update-restaurant-offer-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "update-restaurant-offer-error",
        severity: "error",
      });
    },
  });
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { TRestaurantSettingsOffersFormSchema } from "@/features/private/partner/schemas/restaurant-settings.schema";
import { postData } from "@/lib/api-client";

export function useCreateOffer(restaurantId: string) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation({
    mutationFn: (data: TRestaurantSettingsOffersFormSchema) =>
      postData(`/partner/restaurants/${restaurantId}/offers`, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-offers", restaurantId],
      });

      notifications.show(response.message, {
        key: "partner-create-offer-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "partner-create-offer-error",
        severity: "error",
      });
    },
  });
}

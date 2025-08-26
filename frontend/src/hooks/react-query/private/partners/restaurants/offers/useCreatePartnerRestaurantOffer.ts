import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { postData } from "@/lib/api-client";
import { TPartnerRestaurantSettingsOffersFormSchema } from "@/validations/partner-restaurant-settings-validations";

export function useCreatePartnerRestaurantOffer(restaurantId: string) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation({
    mutationFn: (data: TPartnerRestaurantSettingsOffersFormSchema) =>
      postData(`/partner/restaurants/${restaurantId}/offers`, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-offer", restaurantId],
      });

      notifications.show(response.message, {
        key: "create-restaurant-offer-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "create-restaurant-offer-error",
        severity: "error",
      });
    },
  });
}

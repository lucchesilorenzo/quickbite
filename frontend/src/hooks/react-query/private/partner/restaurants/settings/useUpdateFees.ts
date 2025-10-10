import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { updateData } from "@/lib/api-client";
import { TRestaurantSettingsFeesFormSchema } from "@/validations/private/partner/restaurant-settings-validations";

export function useUpdateFees(restaurantId: string) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation({
    mutationFn: (data: TRestaurantSettingsFeesFormSchema) =>
      updateData(`/partner/restaurants/${restaurantId}/settings/fees`, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-restaurant", restaurantId],
      });

      notifications.show(response.message, {
        key: "partner-update-fees-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "partner-update-fees-error",
        severity: "error",
      });
    },
  });
}

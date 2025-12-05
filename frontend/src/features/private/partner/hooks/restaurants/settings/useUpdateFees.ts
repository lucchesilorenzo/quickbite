import {
  UpdateFeesPayload,
  UpdateFeesResponse,
} from "@partner/types/settings/settings.api.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { updateData } from "@/lib/api-client";

type UseUpdateFees = {
  restaurantId: string;
};

export function useUpdateFees({ restaurantId }: UseUpdateFees) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<UpdateFeesResponse, Error, UpdateFeesPayload>({
    mutationFn: (data) =>
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

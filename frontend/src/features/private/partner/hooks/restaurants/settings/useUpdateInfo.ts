import {
  UpdateInfoPayload,
  UpdateInfoResponse,
} from "@partner/types/settings/settings.api.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { postData } from "@/lib/api-client";

type UseUpdateInfoOptions = {
  restaurantId: string;
};

export function useUpdateInfo({ restaurantId }: UseUpdateInfoOptions) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<UpdateInfoResponse, Error, UpdateInfoPayload>({
    mutationFn: (data) =>
      postData(`/partner/restaurants/${restaurantId}/info`, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-restaurant", restaurantId],
      });

      notifications.show(response.message, {
        key: "partner-update-restaurant-info-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "partner-update-restaurant-info-error",
        severity: "error",
      });
    },
  });
}

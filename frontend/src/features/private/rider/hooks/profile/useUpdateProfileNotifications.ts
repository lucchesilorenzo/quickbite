import {
  UpdateProfileNotificationsPayload,
  UpdateProfileNotificationsResponse,
} from "@rider/types/profile/profile.api.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { updateData } from "@/lib/api-client";

export function useUpdateProfileNotifications() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<
    UpdateProfileNotificationsResponse,
    Error,
    UpdateProfileNotificationsPayload
  >({
    mutationFn: (data) => updateData("/rider/profile/notifications", data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });

      notifications.show(response.message, {
        key: "rider-update-profile-notifications-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "rider-update-profile-notifications-error",
        severity: "error",
      });
    },
  });
}

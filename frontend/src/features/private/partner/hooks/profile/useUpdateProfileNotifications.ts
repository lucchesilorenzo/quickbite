import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import {
  UpdateProfileNotificationsPayload,
  UpdateProfileNotificationsResponse,
} from "../../types/profile/profile.api.types";

import { updateData } from "@/lib/api-client";

export function useUpdateProfileNotifications() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<
    UpdateProfileNotificationsResponse,
    Error,
    UpdateProfileNotificationsPayload
  >({
    mutationFn: (data) => updateData("/partner/profile/notifications", data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["auth"],
      });

      notifications.show(response.message, {
        key: "partner-update-profile-notifications-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "partner-update-profile-notifications-error",
        severity: "error",
      });
    },
  });
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { getRiderProfile } from "@/api/endpoints/rider-profile/rider-profile";
import {
  RiderUpdateProfileNotificationsRequest,
  UpdateRiderProfileNotifications200,
} from "@/api/models";
import api from "@/lib/api-client";

export function useUpdateProfileNotifications() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<
    UpdateRiderProfileNotifications200,
    Error,
    RiderUpdateProfileNotificationsRequest
  >({
    mutationFn: async (data) => {
      const response =
        await getRiderProfile(api).updateRiderProfileNotifications(data);

      return response.data;
    },
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

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { getRiderProfile } from "@/api/backend/endpoints/rider-profile/rider-profile";
import {
  RiderUpdateProfileNotificationsRequest,
  UpdateRiderProfileNotifications200,
  UpdateRiderProfileNotifications500,
} from "@/api/backend/models";
import api from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

export function useUpdateProfileNotifications() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<
    UpdateRiderProfileNotifications200,
    ApiError<UpdateRiderProfileNotifications500>,
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

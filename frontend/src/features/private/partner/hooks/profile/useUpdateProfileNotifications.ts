import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { getPartnerProfile } from "@/api/endpoints/partner-profile/partner-profile";
import {
  PartnerUpdateProfileNotificationsRequest,
  UpdatePartnerProfileNotifications200,
  UpdatePartnerProfileNotifications500,
} from "@/api/models";
import api from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

export function useUpdateProfileNotifications() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<
    UpdatePartnerProfileNotifications200,
    ApiError<UpdatePartnerProfileNotifications500>,
    PartnerUpdateProfileNotificationsRequest
  >({
    mutationFn: async (data) => {
      const response =
        await getPartnerProfile(api).updatePartnerProfileNotifications(data);

      return response.data;
    },
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

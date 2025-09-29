import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { updateData } from "@/lib/api-client";
import { TPartnerProfileNotificationsFormSchema } from "@/validations/partner-profile-notifications-validations";

export function useUpdatePartnerProfileNotifications() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation({
    mutationFn: (data: TPartnerProfileNotificationsFormSchema) =>
      updateData("/partner/profile/notifications", data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["auth"],
      });

      notifications.show(response.message, {
        key: "update-partner-profile-notifications-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "update-partner-profile-notifications-error",
        severity: "error",
      });
    },
  });
}

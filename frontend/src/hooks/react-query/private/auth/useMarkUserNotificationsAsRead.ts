import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { postData } from "@/lib/api-client";

export function useMarkUserNotificationsAsRead() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation({
    mutationFn: () => postData("/auth/notifications/mark-as-read"),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["user-notifications"],
      });

      notifications.show(response.message, {
        key: "mark-notifications-as-read-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "mark-notifications-as-read-error",
        severity: "error",
      });
    },
  });
}

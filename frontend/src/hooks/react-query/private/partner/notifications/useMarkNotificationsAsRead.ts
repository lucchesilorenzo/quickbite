import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { postData } from "@/lib/api-client";

export function useMarkNotificationsAsRead(restaurantId: string) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation({
    mutationFn: () =>
      postData(
        `/partner/restaurants/${restaurantId}/notifications/mark-as-read`,
      ),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-notifications", restaurantId],
      });

      notifications.show(response.message, {
        key: "partner-notifications-mark-as-read-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "partner-notifications-mark-as-read-error",
        severity: "error",
      });
    },
  });
}

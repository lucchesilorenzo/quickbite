import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { postData } from "@/lib/api-client";

export function useMarkPartnerNotificationsAsRead(restaurantId: string) {
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
        key: "mark-partner-notifications-as-read-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "mark-partner-notifications-as-read-error",
        severity: "error",
      });
    },
  });
}

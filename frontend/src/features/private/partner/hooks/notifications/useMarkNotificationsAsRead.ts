import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { postData } from "@/lib/api-client";
import { ApiResponse } from "@/types/api.types";

type UseMarkNotificationsAsReadOptions = {
  restaurantId: string;
  setOpenMarkUserNotificationsAsRead: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

export function useMarkNotificationsAsRead({
  restaurantId,
  setOpenMarkUserNotificationsAsRead,
}: UseMarkNotificationsAsReadOptions) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<ApiResponse, Error, void>({
    mutationFn: () =>
      postData(
        `/partner/restaurants/${restaurantId}/notifications/mark-as-read`,
      ),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-notifications", restaurantId],
      });

      setOpenMarkUserNotificationsAsRead(false);

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

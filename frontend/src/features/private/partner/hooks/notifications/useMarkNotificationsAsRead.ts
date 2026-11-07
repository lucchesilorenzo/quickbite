import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { getPartnerNotifications } from "@/api/endpoints/partner-notifications/partner-notifications";
import { MarkPartnerNotificationsAsRead200 } from "@/api/models";
import api from "@/lib/api-client";

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

  return useMutation<MarkPartnerNotificationsAsRead200, Error, void>({
    mutationFn: async () => {
      const response =
        await getPartnerNotifications(api).markPartnerNotificationsAsRead(
          restaurantId,
        );

      return response.data;
    },
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

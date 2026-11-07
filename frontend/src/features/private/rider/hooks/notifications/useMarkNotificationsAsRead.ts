import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { getRiderNotifications } from "@/api/endpoints/rider-notifications/rider-notifications";
import { MarkRiderNotificationsAsRead200 } from "@/api/models";
import api from "@/lib/api-client";

type UseMarkNotificationsAsReadOptions = {
  setOpenMarkNotificationsAsReadDialog: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

export function useMarkNotificationsAsRead({
  setOpenMarkNotificationsAsReadDialog,
}: UseMarkNotificationsAsReadOptions) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<MarkRiderNotificationsAsRead200, Error, void>({
    mutationFn: async () => {
      const response =
        await getRiderNotifications(api).markRiderNotificationsAsRead();

      return response.data;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["rider-notifications"],
      });

      setOpenMarkNotificationsAsReadDialog(false);

      notifications.show(response.message, {
        key: "rider-notifications-mark-as-read-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "rider-notifications-mark-as-read-error",
        severity: "error",
      });
    },
  });
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { postData } from "@/lib/api-client";
import { ApiResponse } from "@/types/api.types";

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

  return useMutation<ApiResponse, Error, void>({
    mutationFn: () => postData("/rider/notifications/mark-as-read"),
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

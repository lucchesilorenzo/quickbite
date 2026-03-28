import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { postData } from "@/lib/api-client";
import { ApiResponse } from "@/types/api.types";

export function useEmailVerification() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<ApiResponse, Error, void>({
    mutationFn: (data) =>
      postData("/auth/email/verification-notification", data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });

      notifications.show(response.message, {
        key: "email-verification-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "email-verification-error",
        severity: "error",
      });
    },
  });
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { getPrivateAuth } from "@/api/endpoints/private-auth/private-auth";
import {
  ResendEmailVerification200,
  ResendEmailVerification400,
  ResendEmailVerification500,
} from "@/api/models";
import api from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

export function useEmailVerification() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<
    ResendEmailVerification200,
    ApiError<ResendEmailVerification400 | ResendEmailVerification500>,
    void
  >({
    mutationFn: async () => {
      const response = await getPrivateAuth(api).resendEmailVerification();

      return response.data;
    },
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

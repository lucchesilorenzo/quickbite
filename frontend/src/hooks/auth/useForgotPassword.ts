import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { getPublicAuth } from "@/api/backend/endpoints/public-auth/public-auth";
import {
  ForgotPassword200,
  ForgotPassword429,
  ForgotPasswordRequest,
} from "@/api/backend/models";
import api from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

type UseForgotPasswordOptions = {
  setOpenForgotPasswordDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export function useForgotPassword({
  setOpenForgotPasswordDialog,
}: UseForgotPasswordOptions) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<
    ForgotPassword200,
    ApiError<ForgotPassword429>,
    ForgotPasswordRequest
  >({
    mutationFn: async (data) => {
      const response = await getPublicAuth(api).forgotPassword(data);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      setOpenForgotPasswordDialog(false);

      notifications.show("Email sent successfully.", {
        key: "forgot-password-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "forgot-password-error",
        severity: "error",
      });
    },
  });
}

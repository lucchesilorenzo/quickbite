import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { postData } from "@/lib/api-client";
import { ApiResponse } from "@/types/api.types";
import { ForgotPasswordRequest } from "@/types/auth/auth.api.types";

type UseForgotPasswordOptions = {
  setOpenForgotPasswordDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export function useForgotPassword({
  setOpenForgotPasswordDialog,
}: UseForgotPasswordOptions) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<ApiResponse, Error, ForgotPasswordRequest>({
    mutationFn: (data) => postData("/auth/forgot-password", data),
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

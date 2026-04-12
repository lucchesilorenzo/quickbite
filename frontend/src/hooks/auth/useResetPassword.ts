import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";
import { useNavigate } from "react-router-dom";

import { postData } from "@/lib/api-client";
import { ApiResponse } from "@/types/api.types";
import { ResetPasswordRequest } from "@/types/auth/auth.api.types";

export function useResetPassword() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();
  const navigate = useNavigate();

  return useMutation<ApiResponse, Error, ResetPasswordRequest>({
    mutationFn: (data) => postData("/auth/reset-password", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      navigate("/");

      notifications.show("Password reset successfully.", {
        key: "reset-password-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "reset-password-error",
        severity: "error",
      });
    },
  });
}

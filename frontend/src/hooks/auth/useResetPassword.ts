import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";
import { useNavigate } from "react-router-dom";

import { getPrivateAuth } from "@/api/endpoints/private-auth/private-auth";
import {
  ResetPassword200,
  ResetPassword400,
  ResetPasswordRequest,
} from "@/api/models";
import api from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

export function useResetPassword() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();
  const navigate = useNavigate();

  return useMutation<
    ResetPassword200,
    ApiError<ResetPassword400>,
    ResetPasswordRequest
  >({
    mutationFn: async (data) => {
      const response = await getPrivateAuth(api).resetPassword(data);

      return response.data;
    },
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

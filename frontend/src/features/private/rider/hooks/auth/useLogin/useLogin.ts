import { LoginRequest, LoginResponse } from "@rider/types/auth/auth.api.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";
import { useNavigate } from "react-router-dom";

import { postData } from "@/lib/api-client";

export function useLogin() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();
  const navigate = useNavigate();

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: (data) => postData("/rider/auth/login", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      navigate("/rider/job-posts");
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "rider-login-error",
        severity: "error",
      });
    },
  });
}

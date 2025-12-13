import {
  RegisterPayload,
  RegisterResponse,
} from "@rider/types/auth/auth.api.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";
import { useNavigate } from "react-router-dom";

import { postData } from "@/lib/api-client";

export function useRegister() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();
  const navigate = useNavigate();

  return useMutation<RegisterResponse, Error, RegisterPayload>({
    mutationFn: (data) => postData("/rider/auth/register", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });

      localStorage.removeItem("rider_registration_data");

      navigate("/rider/dashboard");
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "rider-register-error",
        severity: "error",
      });
    },
  });
}

import {
  RegisterPayload,
  RegisterResponse,
} from "@partner/types/auth/auth.api.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";
import { useNavigate } from "react-router-dom";

import { postData } from "@/lib/api-client";

export function useRegister() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();
  const navigate = useNavigate();

  return useMutation<RegisterResponse, Error, RegisterPayload>({
    mutationFn: (data) => postData("/partner/auth/register", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      navigate("/partner/restaurants");
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "partner-register-error",
        severity: "error",
      });
    },
  });
}

import { TRegisterFormSchema } from "@customer/schemas/auth.schema";
import {
  RegisterPayload,
  RegisterResponse,
} from "@customer/types/auth/auth.api.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";
import { useNavigate } from "react-router-dom";

import { postData } from "@/lib/api-client";

export function useRegister() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();
  const navigate = useNavigate();

  return useMutation<RegisterResponse, Error, RegisterPayload>({
    mutationFn: (data: TRegisterFormSchema) =>
      postData("/customer/auth/register", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      navigate("/");
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "customer-register-error",
        severity: "error",
      });
    },
  });
}

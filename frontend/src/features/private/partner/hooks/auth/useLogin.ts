import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";
import { useNavigate } from "react-router-dom";

import { TLoginFormSchema } from "@/features/private/partner/validations/auth-validations";
import { postData } from "@/lib/api-client";

export function useLogin() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: TLoginFormSchema) =>
      postData("/partner/auth/login", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      navigate("/partner/restaurants");
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "partner-login-error",
        severity: "error",
      });
    },
  });
}

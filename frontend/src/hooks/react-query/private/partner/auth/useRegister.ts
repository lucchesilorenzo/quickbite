import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";
import { useNavigate } from "react-router-dom";

import { postData } from "@/lib/api-client";
import { TRegisterFormSchema } from "@/validations/private/partner/auth-validations";

export function useRegister() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: TRegisterFormSchema) =>
      postData("/partner/auth/register", data),
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

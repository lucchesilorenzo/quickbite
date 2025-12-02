import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";
import { useNavigate } from "react-router-dom";

import { TRegisterFormSchema } from "@/features/private/rider/schemas/auth.schema";
import { postData } from "@/lib/api-client";

export function useRegister() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: TRegisterFormSchema) =>
      postData("/rider/auth/register", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
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

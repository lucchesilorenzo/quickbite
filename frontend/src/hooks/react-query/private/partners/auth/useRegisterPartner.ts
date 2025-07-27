import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";
import { useNavigate } from "react-router-dom";

import { postData } from "@/lib/api-client";
import { TPartnerRegisterFormSchema } from "@/validations/partner-auth-validations";

export function useRegisterPartner() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: TPartnerRegisterFormSchema) =>
      postData("/partner/auth/register", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      navigate("/partner/dashboard");
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "register-partner-error",
        severity: "error",
      });
    },
  });
}

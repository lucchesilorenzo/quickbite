import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";
import { useNavigate } from "react-router-dom";

import { postData } from "@/lib/api-client";
import { TPartnerLoginFormSchema } from "@/validations/partner-auth-validations";

export function useLoginPartner() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: TPartnerLoginFormSchema) =>
      postData("/partner/auth/login", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      navigate("/partner/restaurants");
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "login-partner-error",
        severity: "error",
      });
    },
  });
}

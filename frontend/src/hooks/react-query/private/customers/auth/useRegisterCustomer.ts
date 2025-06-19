import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";
import { useNavigate } from "react-router-dom";

import { postData } from "@/lib/api-client";
import { TCustomerRegisterFormSchema } from "@/validations/customer-auth-validations";

export function useRegisterCustomer() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: TCustomerRegisterFormSchema) =>
      postData("/customer/auth/register", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      navigate("/");
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "register-customer-error",
        severity: "error",
      });
    },
  });
}

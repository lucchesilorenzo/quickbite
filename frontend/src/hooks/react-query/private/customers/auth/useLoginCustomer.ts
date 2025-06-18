import { useMutation } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";
import { useNavigate } from "react-router-dom";

import { postData } from "@/lib/api-client";
import { TCustomerLoginFormSchema } from "@/validations/customer-auth-validations";

export function useLoginCustomer() {
  const notifications = useNotifications();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: TCustomerLoginFormSchema) =>
      postData("/customer/auth/login", data),
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "login-customer-error",
        severity: "error",
      });
    },
  });
}

import { useMutation } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { postData } from "@/lib/api-client";
import { TCustomerRegisterFormSchema } from "@/validations/customer-auth-validations";

export function useRegisterCustomer() {
  const notifications = useNotifications();

  return useMutation({
    mutationFn: (data: TCustomerRegisterFormSchema) =>
      postData("/customer/auth/register", data),
    onError: (error) => {
      notifications.show(error.message, {
        key: "register-customer-error",
        severity: "error",
      });
    },
  });
}

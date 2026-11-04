import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";
import { useNavigate } from "react-router-dom";

import { getCustomerAuth } from "@/api/endpoints/customer-auth/customer-auth";
import { CustomerLoginRequest, LoginCustomer200 } from "@/api/models";
import api from "@/lib/api-client";

export function useLogin() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();
  const navigate = useNavigate();

  return useMutation<LoginCustomer200, Error, CustomerLoginRequest>({
    mutationFn: async (data) => {
      const response = await getCustomerAuth(api).loginCustomer(data);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      navigate("/");
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "customer-login-error",
        severity: "error",
      });
    },
  });
}

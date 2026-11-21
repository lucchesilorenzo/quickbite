import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";
import { useNavigate } from "react-router-dom";

import { getCustomerAuth } from "@/api/endpoints/customer-auth/customer-auth";
import {
  CustomerLoginRequest,
  LoginCustomer200,
  LoginCustomer400,
  LoginCustomer401,
  LoginCustomer403,
  LoginCustomer500,
} from "@/api/models";
import api from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

export function useLogin() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();
  const navigate = useNavigate();

  return useMutation<
    LoginCustomer200,
    ApiError<
      LoginCustomer400 | LoginCustomer401 | LoginCustomer403 | LoginCustomer500
    >,
    CustomerLoginRequest
  >({
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

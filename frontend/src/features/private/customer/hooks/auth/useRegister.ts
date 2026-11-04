import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";
import { useNavigate } from "react-router-dom";

import { getCustomerAuth } from "@/api/endpoints/customer-auth/customer-auth";
import { CustomerRegisterRequest, RegisterCustomer201 } from "@/api/models";
import api from "@/lib/api-client";

export function useRegister() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();
  const navigate = useNavigate();

  return useMutation<RegisterCustomer201, Error, CustomerRegisterRequest>({
    mutationFn: async (data) => {
      const response = await getCustomerAuth(api).registerCustomer(data);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      navigate("/auth/verify-email");
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "customer-register-error",
        severity: "error",
      });
    },
  });
}

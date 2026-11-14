import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";
import { useNavigate } from "react-router-dom";

import { getCustomerAuth } from "@/api/endpoints/customer-auth/customer-auth";
import { LogoutCustomer200 } from "@/api/models";
import api from "@/lib/api-client";

export function useLogout() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();
  const navigate = useNavigate();

  return useMutation<LogoutCustomer200, Error, void>({
    mutationFn: async () => {
      const response = await getCustomerAuth(api).logoutCustomer({
        refresh_token: localStorage.getItem("refresh_token") ?? "",
      });

      return response.data;
    },
    onSuccess: () => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("checkout_data_by_restaurant");
      queryClient.clear();

      navigate("/customer/auth/login");
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "customer-logout-error",
        severity: "error",
      });
    },
  });
}

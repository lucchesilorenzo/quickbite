import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/contexts/useAuth";
import { postData } from "@/lib/api-client";

export function useLogoutCustomer() {
  const { resetUser } = useAuth();
  const queryClient = useQueryClient();
  const notifications = useNotifications();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => postData("/customer/auth/logout"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      localStorage.removeItem("token");
      localStorage.removeItem("checkout_data_by_restaurant");

      navigate("/customer/auth/login");
      resetUser();
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "logout-customer-error",
        severity: "error",
      });
    },
  });
}

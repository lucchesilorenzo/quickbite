import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";
import { useNavigate } from "react-router-dom";

import { postData } from "@/lib/api-client";
import { ApiResponse } from "@/types/api.types";

export function useLogout() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();
  const navigate = useNavigate();

  return useMutation<ApiResponse, Error, void>({
    mutationFn: () => postData("/customer/auth/logout"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      localStorage.removeItem("token");
      localStorage.removeItem("checkout_data_by_restaurant");

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

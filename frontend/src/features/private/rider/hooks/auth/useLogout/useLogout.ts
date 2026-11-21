import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";
import { useNavigate } from "react-router-dom";

import { getRiderAuth } from "@/api/endpoints/rider-auth/rider-auth";
import { LogoutRider200, LogoutRider500 } from "@/api/models";
import api from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

export function useLogout() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();
  const navigate = useNavigate();

  return useMutation<LogoutRider200, ApiError<LogoutRider500>, void>({
    mutationFn: async () => {
      const response = await getRiderAuth(api).logoutRider({
        refresh_token: localStorage.getItem("refresh_token") ?? "",
      });

      return response.data;
    },
    onSuccess: () => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      queryClient.clear();

      navigate("/rider/auth/login");
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "rider-logout-error",
        severity: "error",
      });
    },
  });
}

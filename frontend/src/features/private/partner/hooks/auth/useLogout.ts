import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";
import { useNavigate } from "react-router-dom";

import { getPartnerAuth } from "@/api/endpoints/partner-auth/partner-auth";
import { LogoutPartner200 } from "@/api/models";
import api from "@/lib/api-client";

export function useLogout() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();
  const navigate = useNavigate();

  return useMutation<LogoutPartner200, Error, void>({
    mutationFn: async () => {
      const response = await getPartnerAuth(api).logoutPartner({
        refresh_token: localStorage.getItem("refresh_token") ?? "",
      });

      return response.data;
    },
    onSuccess: () => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      queryClient.clear();

      navigate("/partner/auth/login");
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "partner-logout-error",
        severity: "error",
      });
    },
  });
}

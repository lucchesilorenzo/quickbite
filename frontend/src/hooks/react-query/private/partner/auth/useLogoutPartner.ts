import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/contexts/public/useAuth";
import { postData } from "@/lib/api-client";

export function useLogoutPartner() {
  const { resetUser } = useAuth();
  const queryClient = useQueryClient();
  const notifications = useNotifications();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => postData("/partner/auth/logout"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      localStorage.removeItem("token");

      navigate("/partner/auth/login");
      resetUser();
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "logout-partner-error",
        severity: "error",
      });
    },
  });
}

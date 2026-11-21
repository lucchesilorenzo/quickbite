import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";
import { useNavigate } from "react-router-dom";

import { getPartnerAuth } from "@/api/endpoints/partner-auth/partner-auth";
import {
  LoginPartner200,
  LoginPartner401,
  LoginPartner403,
  LoginPartner500,
  PartnerLoginRequest,
} from "@/api/models";
import api from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

export function useLogin() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();
  const navigate = useNavigate();

  return useMutation<
    LoginPartner200,
    ApiError<LoginPartner401 | LoginPartner403 | LoginPartner500>,
    PartnerLoginRequest
  >({
    mutationFn: async (data) => {
      const response = await getPartnerAuth(api).loginPartner(data);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      navigate("/partner/restaurants");
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "partner-login-error",
        severity: "error",
      });
    },
  });
}

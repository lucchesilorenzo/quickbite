import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";
import { useNavigate } from "react-router-dom";

import { getRiderAuth } from "@/api/endpoints/rider-auth/rider-auth";
import {
  LoginRider200,
  LoginRider401,
  LoginRider403,
  LoginRider500,
  RiderLoginRequest,
} from "@/api/models";
import api from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

export function useLogin() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();
  const navigate = useNavigate();

  return useMutation<
    LoginRider200,
    ApiError<LoginRider401 | LoginRider403 | LoginRider500>,
    RiderLoginRequest
  >({
    mutationFn: async (data) => {
      const response = await getRiderAuth(api).loginRider(data);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      navigate("/rider/job-posts");
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "rider-login-error",
        severity: "error",
      });
    },
  });
}

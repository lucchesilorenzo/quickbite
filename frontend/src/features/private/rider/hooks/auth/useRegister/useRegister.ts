import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";
import { useNavigate } from "react-router-dom";

import { getRiderAuth } from "@/api/backend/endpoints/rider-auth/rider-auth";
import {
  RegisterRider201,
  RegisterRider404,
  RegisterRider409,
  RegisterRider500,
  RiderRegisterRequest,
} from "@/api/backend/models";
import api from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

export function useRegister() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();
  const navigate = useNavigate();

  return useMutation<
    RegisterRider201,
    ApiError<RegisterRider404 | RegisterRider409 | RegisterRider500>,
    RiderRegisterRequest
  >({
    mutationFn: async (data) => {
      const response = await getRiderAuth(api).registerRider(data);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });

      localStorage.removeItem("rider_registration_data");

      navigate("/auth/verify-email");
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "rider-register-error",
        severity: "error",
      });
    },
  });
}

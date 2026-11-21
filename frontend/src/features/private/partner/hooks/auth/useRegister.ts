import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";
import { useNavigate } from "react-router-dom";

import { getPartnerAuth } from "@/api/endpoints/partner-auth/partner-auth";
import {
  PartnerRegisterRequest,
  RegisterPartner201,
  RegisterPartner404,
  RegisterPartner409,
  RegisterPartner500,
} from "@/api/models";
import api from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

export function useRegister() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();
  const navigate = useNavigate();

  return useMutation<
    RegisterPartner201,
    ApiError<RegisterPartner404 | RegisterPartner409 | RegisterPartner500>,
    PartnerRegisterRequest
  >({
    mutationFn: async (data) => {
      const response = await getPartnerAuth(api).registerPartner(data);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      navigate("/auth/verify-email");
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "partner-register-error",
        severity: "error",
      });
    },
  });
}

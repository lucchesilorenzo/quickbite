import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import {
  UpdatePersonalInfoPayload,
  UpdatePersonalInfoResponse,
} from "../../types/profile/profile.api.types";

import { updateData } from "@/lib/api-client";

export function useUpdatePersonalInfo() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<
    UpdatePersonalInfoResponse,
    Error,
    UpdatePersonalInfoPayload
  >({
    mutationFn: (data) => updateData("/customer/profile/personal-info", data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      notifications.show(response.message, {
        key: "customer-update-personal-info-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "customer-update-personal-info-error",
        severity: "error",
      });
    },
  });
}

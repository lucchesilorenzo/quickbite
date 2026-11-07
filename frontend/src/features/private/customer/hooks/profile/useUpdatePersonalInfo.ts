import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { getCustomerProfile } from "@/api/endpoints/customer-profile/customer-profile";
import {
  UpdateCustomerPersonalInfo200,
  UpdatePersonalInfoRequest,
} from "@/api/models";
import api from "@/lib/api-client";

export function useUpdatePersonalInfo() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<
    UpdateCustomerPersonalInfo200,
    Error,
    UpdatePersonalInfoRequest
  >({
    mutationFn: async (data) => {
      const response =
        await getCustomerProfile(api).updateCustomerPersonalInfo(data);

      return response.data;
    },
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

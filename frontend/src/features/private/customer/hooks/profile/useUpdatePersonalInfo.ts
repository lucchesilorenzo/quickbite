import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { getCustomerProfile } from "@/api/backend/endpoints/customer-profile/customer-profile";
import {
  UpdateCustomerPersonalInfo200,
  UpdateCustomerPersonalInfo500,
  UpdatePersonalInfoRequest,
} from "@/api/backend/models";
import api from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

export function useUpdatePersonalInfo() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<
    UpdateCustomerPersonalInfo200,
    ApiError<UpdateCustomerPersonalInfo500>,
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

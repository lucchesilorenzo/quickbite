import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { getCustomerProfile } from "@/api/endpoints/customer-profile/customer-profile";
import {
  UpdateAddressInfoRequest,
  UpdateCustomerAddressInfo200,
} from "@/api/models";
import api from "@/lib/api-client";

export function useUpdateAddressInfo() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<
    UpdateCustomerAddressInfo200,
    Error,
    UpdateAddressInfoRequest
  >({
    mutationFn: async (data) => {
      const response =
        await getCustomerProfile(api).updateCustomerAddressInfo(data);

      return response.data;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      notifications.show(response.message, {
        key: "update-customer-address-info-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "customer-update-address-info-error",
        severity: "error",
      });
    },
  });
}

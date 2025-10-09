import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { updateData } from "@/lib/api-client";
import { TEditAddressFormSchema } from "@/validations/private/customer/profile-validations";

export function useUpdateAddressInfo() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation({
    mutationFn: (data: TEditAddressFormSchema) =>
      updateData("/customer/profile/address-info", data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      notifications.show(response.message, {
        key: "update-customer-address-info-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "update-customer-address-info-error",
        severity: "error",
      });
    },
  });
}

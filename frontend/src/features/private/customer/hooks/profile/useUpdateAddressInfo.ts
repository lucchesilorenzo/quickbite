import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { TEditAddressFormSchema } from "@/features/private/customer/validations/profile-validations";
import { updateData } from "@/lib/api-client";

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
        key: "customer-update-address-info-error",
        severity: "error",
      });
    },
  });
}

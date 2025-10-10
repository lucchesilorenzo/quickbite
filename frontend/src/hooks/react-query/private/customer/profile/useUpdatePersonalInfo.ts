import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { updateData } from "@/lib/api-client";
import { TPersonalInfoField } from "@/validations/private/customer/profile-validations";

export function useUpdatePersonalInfo() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation({
    mutationFn: (data: TPersonalInfoField) =>
      updateData("/customer/profile/personal-info", data),
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

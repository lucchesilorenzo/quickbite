import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { TPersonalInfoField } from "@/features/private/customer/validations/profile-validations";
import { updateData } from "@/lib/api-client";

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

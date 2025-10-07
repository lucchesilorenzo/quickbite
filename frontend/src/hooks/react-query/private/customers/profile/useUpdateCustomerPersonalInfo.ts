import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { updateData } from "@/lib/api-client";
import { PersonalInfoField } from "@/validations/personal-info-validations";

export function useUpdateCustomerPersonalInfo() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation({
    mutationFn: (data: PersonalInfoField) =>
      updateData("/customer/profile/personal-info", data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      notifications.show(response.message, {
        key: "update-customer-personal-info-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "update-customer-personal-info-error",
        severity: "error",
      });
    },
  });
}

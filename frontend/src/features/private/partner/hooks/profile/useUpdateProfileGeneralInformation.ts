import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { TProfileGeneralFormSchema } from "@/features/private/partner/validations/profile-general-validations";
import { updateData } from "@/lib/api-client";

export function useUpdateProfileGeneralInformation() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation({
    mutationFn: (data: TProfileGeneralFormSchema) =>
      updateData("/partner/profile/general", data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["auth"],
      });

      notifications.show(response.message, {
        key: "partner-profile-general-update-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "partner-profile-general-update-error",
        severity: "error",
      });
    },
  });
}

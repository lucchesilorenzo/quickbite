import {
  UpdateProfileGeneralInformationPayload,
  UpdateProfileGeneralInformationResponse,
} from "@rider/types/profile/profile.api.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { updateData } from "@/lib/api-client";

export function useUpdateProfileGeneralInformation() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<
    UpdateProfileGeneralInformationResponse,
    Error,
    UpdateProfileGeneralInformationPayload
  >({
    mutationFn: (data) => updateData("/rider/profile/general", data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["auth"],
      });

      notifications.show(response.message, {
        key: "rider-profile-general-update-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "rider-profile-general-update-error",
        severity: "error",
      });
    },
  });
}

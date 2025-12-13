import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import {
  UpdateProfileGeneralInformationPayload,
  UpdateProfileGeneralInformationResponse,
} from "../../types/profile/profile.api.types";

import { updateData } from "@/lib/api-client";

export function useUpdateProfileGeneralInformation() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<
    UpdateProfileGeneralInformationResponse,
    Error,
    UpdateProfileGeneralInformationPayload
  >({
    mutationFn: (data) => updateData("/partner/profile/general", data),
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

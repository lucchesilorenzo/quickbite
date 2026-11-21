import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { getRiderProfile } from "@/api/endpoints/rider-profile/rider-profile";
import {
  RiderUpdateProfileGeneralInformationRequest,
  UpdateRiderProfileGeneralInformation200,
  UpdateRiderProfileGeneralInformation404,
  UpdateRiderProfileGeneralInformation500,
} from "@/api/models";
import api from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

export function useUpdateProfileGeneralInformation() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<
    UpdateRiderProfileGeneralInformation200,
    ApiError<
      | UpdateRiderProfileGeneralInformation404
      | UpdateRiderProfileGeneralInformation500
    >,
    RiderUpdateProfileGeneralInformationRequest
  >({
    mutationFn: async (data) => {
      const response =
        await getRiderProfile(api).updateRiderProfileGeneralInformation(data);

      return response.data;
    },
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

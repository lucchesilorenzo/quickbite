import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { getPartnerProfile } from "@/api/endpoints/partner-profile/partner-profile";
import {
  PartnerUpdateProfileGeneralInformationRequest,
  UpdatePartnerProfileGeneral200,
} from "@/api/models";
import api from "@/lib/api-client";

export function useUpdateProfileGeneralInformation() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<
    UpdatePartnerProfileGeneral200,
    Error,
    PartnerUpdateProfileGeneralInformationRequest
  >({
    mutationFn: async (data) => {
      const response =
        await getPartnerProfile(api).updatePartnerProfileGeneral(data);

      return response.data;
    },
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

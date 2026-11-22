import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { getPartnerProfile } from "@/api/backend/endpoints/partner-profile/partner-profile";
import {
  PartnerUpdateProfileGeneralInformationRequest,
  UpdatePartnerProfileGeneral200,
  UpdatePartnerProfileGeneral404,
  UpdatePartnerProfileGeneral500,
} from "@/api/backend/models";
import api from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

export function useUpdateProfileGeneralInformation() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<
    UpdatePartnerProfileGeneral200,
    ApiError<UpdatePartnerProfileGeneral404 | UpdatePartnerProfileGeneral500>,
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

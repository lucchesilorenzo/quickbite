import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { getPartnerJobApplications } from "@/api/endpoints/partner-job-applications/partner-job-applications";
import {
  UpdateJobApplicationRequest,
  UpdateJobApplicationStatus200,
  UpdateJobApplicationStatus409,
  UpdateJobApplicationStatus500,
} from "@/api/models";
import api from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

type UseUpdateJobApplicationStatusOptions = {
  jobApplicationId: string | null;
  setOpenConfirmJobApplicationDialog: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

export function useUpdateJobApplicationStatus({
  jobApplicationId,
  setOpenConfirmJobApplicationDialog,
}: UseUpdateJobApplicationStatusOptions) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<
    UpdateJobApplicationStatus200,
    ApiError<UpdateJobApplicationStatus409 | UpdateJobApplicationStatus500>,
    UpdateJobApplicationRequest
  >({
    mutationFn: async (data) => {
      const response = await getPartnerJobApplications(
        api,
      ).updateJobApplicationStatus(jobApplicationId ?? "", data);

      return response.data;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-job-applications"],
      });

      setOpenConfirmJobApplicationDialog(false);

      notifications.show(response.message, {
        key: "partner-update-job-application-status-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "partner-update-job-application-status-error",
        severity: "error",
      });
    },
  });
}

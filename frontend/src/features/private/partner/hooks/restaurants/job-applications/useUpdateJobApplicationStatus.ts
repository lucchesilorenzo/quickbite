import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { getPartnerJobApplications } from "@/api/endpoints/partner-job-applications/partner-job-applications";
import {
  UpdateJobApplicationRequest,
  UpdateJobApplicationStatus200,
} from "@/api/models";
import api from "@/lib/api-client";

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
    Error,
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

import {
  UpdateJobApplicationStatusRequest,
  UpdateJobApplicationStatusResponse,
} from "@partner/types/job-applications/job-application.api.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { updateData } from "@/lib/api-client";

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
    UpdateJobApplicationStatusResponse,
    Error,
    UpdateJobApplicationStatusRequest
  >({
    mutationFn: (data) =>
      updateData(`/partner/job-applications/${jobApplicationId}/status`, data),
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

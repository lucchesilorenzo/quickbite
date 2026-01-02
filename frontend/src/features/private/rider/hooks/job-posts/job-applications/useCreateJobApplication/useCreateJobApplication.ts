import { CreateJobApplicationResponse } from "@rider/types/job-posts/job-applications/job-application.api.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { postData } from "@/lib/api-client";

type UseCreateJobApplicationOptions = {
  jobPostId: string;
};

export function useCreateJobApplication({
  jobPostId,
}: UseCreateJobApplicationOptions) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<CreateJobApplicationResponse, Error, FormData>({
    mutationFn: (data) =>
      postData(`/rider/job-posts/${jobPostId}/applications`, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["rider-job-applications", jobPostId],
      });

      notifications.show(response.message, {
        key: "rider-create-job-application-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "rider-create-job-application-error",
        severity: "error",
      });
    },
  });
}

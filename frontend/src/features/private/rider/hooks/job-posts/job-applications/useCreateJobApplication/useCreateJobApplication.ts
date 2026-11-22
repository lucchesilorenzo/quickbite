import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";
import { useNavigate } from "react-router-dom";

import { getRiderJobApplications } from "@/api/backend/endpoints/rider-job-applications/rider-job-applications";
import {
  CreateJobApplicationRequest,
  CreateRiderJobApplication201,
  CreateRiderJobApplication500,
} from "@/api/backend/models";
import api from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

type UseCreateJobApplicationOptions = {
  jobPostId?: string;
};

export function useCreateJobApplication({
  jobPostId,
}: UseCreateJobApplicationOptions) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();
  const navigate = useNavigate();

  return useMutation<
    CreateRiderJobApplication201,
    ApiError<CreateRiderJobApplication500>,
    CreateJobApplicationRequest
  >({
    mutationFn: async (data) => {
      const response = await getRiderJobApplications(
        api,
      ).createRiderJobApplication(jobPostId ?? "", data);

      return response.data;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["rider-job-applications", jobPostId],
      });

      notifications.show(response.message, {
        key: "rider-create-job-application-success",
        severity: "success",
      });

      navigate("/rider/job-posts");
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "rider-create-job-application-error",
        severity: "error",
      });
    },
  });
}

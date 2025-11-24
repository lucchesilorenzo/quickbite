import {
  CreateJobPostPayload,
  CreateJobPostResponse,
} from "@partner/types/job-posts/job-posts.api-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { postData } from "@/lib/api-client";

export function useCreateJobPost(
  restaurantId: string,
  setOpenAddJobPostDialog: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<CreateJobPostResponse, Error, CreateJobPostPayload>({
    mutationFn: (data) =>
      postData(`/partner/restaurants/${restaurantId}/job-posts`, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-job-posts", restaurantId],
      });

      setOpenAddJobPostDialog(false);

      notifications.show(response.message, {
        key: "partner-create-job-post-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "partner-create-job-post-error",
        severity: "error",
      });
    },
  });
}

import {
  UpdateJobPostPayload,
  UpdateJobPostResponse,
} from "@partner/types/job-post/job-post.api-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { updateData } from "@/lib/api-client";

type UseUpdateJobPostOptions = {
  restaurantId: string;
  jobPostId?: string;
  setOpenEditJobPostDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export function useUpdateJobPost({
  restaurantId,
  jobPostId,
  setOpenEditJobPostDialog,
}: UseUpdateJobPostOptions) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<UpdateJobPostResponse, Error, UpdateJobPostPayload>({
    mutationFn: (data) =>
      updateData(
        `/partner/restaurants/${restaurantId}/job-posts/${jobPostId}`,
        data,
      ),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-job-posts", restaurantId],
      });

      setOpenEditJobPostDialog(false);

      notifications.show(response.message, {
        key: "partner-update-job-post-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "partner-update-job-post-error",
        severity: "error",
      });
    },
  });
}

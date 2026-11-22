import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { getPartnerJobPosts } from "@/api/backend/endpoints/partner-job-posts/partner-job-posts";
import {
  DeletePartnerJobPost200,
  DeletePartnerJobPost400,
  DeletePartnerJobPost500,
} from "@/api/backend/models";
import api from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

type UseDeleteJobPostOptions = {
  restaurantId: string;
  jobPostId: string | null;
  setOpenDeleteJobPostDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export function useDeleteJobPost({
  restaurantId,
  jobPostId,
  setOpenDeleteJobPostDialog,
}: UseDeleteJobPostOptions) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<
    DeletePartnerJobPost200,
    ApiError<DeletePartnerJobPost400 | DeletePartnerJobPost500>,
    void
  >({
    mutationFn: async () => {
      const response = await getPartnerJobPosts(api).deletePartnerJobPost(
        restaurantId,
        jobPostId ?? "",
      );

      return response.data;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-job-posts", restaurantId],
      });

      setOpenDeleteJobPostDialog(false);

      notifications.show(response.message, {
        key: "partner-delete-job-post-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "partner-delete-job-post-error",
        severity: "error",
      });
    },
  });
}

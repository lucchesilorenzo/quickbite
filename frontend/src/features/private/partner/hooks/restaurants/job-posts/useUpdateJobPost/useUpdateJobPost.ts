import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { getPartnerJobPosts } from "@/api/endpoints/partner-job-posts/partner-job-posts";
import { UpdateJobPostRequest, UpdatePartnerJobPost200 } from "@/api/models";
import api from "@/lib/api-client";

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

  return useMutation<UpdatePartnerJobPost200, Error, UpdateJobPostRequest>({
    mutationFn: async (data) => {
      const response = await getPartnerJobPosts(api).updatePartnerJobPost(
        restaurantId,
        jobPostId ?? "",
        data,
      );

      return response.data;
    },
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

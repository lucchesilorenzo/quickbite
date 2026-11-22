import { useQuery } from "@tanstack/react-query";

import { getRiderJobPosts } from "@/api/backend/endpoints/rider-job-posts/rider-job-posts";
import { GetRiderJobPost200, GetRiderJobPost500 } from "@/api/backend/models";
import api from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

type UseGetJobPostOptions = {
  jobPostId: string | null;
};

export function useGetJobPost({ jobPostId }: UseGetJobPostOptions) {
  return useQuery<GetRiderJobPost200, ApiError<GetRiderJobPost500>>({
    queryKey: ["rider-job-posts", jobPostId],
    queryFn: async () => {
      const response = await getRiderJobPosts(api).getRiderJobPost(
        jobPostId ?? "",
      );

      return response.data;
    },
    enabled: !!jobPostId,
  });
}

import { useQuery } from "@tanstack/react-query";

import { getRiderJobPosts } from "@/api/endpoints/rider-job-posts/rider-job-posts";
import { GetRiderJobPost200 } from "@/api/models";
import api from "@/lib/api-client";

type UseGetJobPostOptions = {
  jobPostId: string | null;
};

export function useGetJobPost({ jobPostId }: UseGetJobPostOptions) {
  return useQuery<GetRiderJobPost200>({
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

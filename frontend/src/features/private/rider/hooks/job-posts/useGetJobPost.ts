import { useQuery } from "@tanstack/react-query";

import { GetJobPostResponse } from "../../types/job-posts/job-post.api.types";

import { fetchData } from "@/lib/api-client";

type UseGetJobPostOptions = {
  jobPostId: string | null;
};

export function useGetJobPost({ jobPostId }: UseGetJobPostOptions) {
  return useQuery<GetJobPostResponse>({
    queryKey: ["rider-job-posts", jobPostId],
    queryFn: () => fetchData(`/rider/job-posts/${jobPostId}`),
    enabled: !!jobPostId,
  });
}

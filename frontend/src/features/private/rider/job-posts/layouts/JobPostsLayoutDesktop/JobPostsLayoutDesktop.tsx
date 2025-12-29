import { Box, Container, Divider } from "@mui/material";
import { useJobPosts } from "@rider/contexts/JobPostsProvider";
import { useGetJobPost } from "@rider/hooks/job-posts/useGetJobPost";

import JobPostSplitLayout from "../JobPostSplitLayout";

export default function JobPostsLayoutDesktop() {
  const { jobPostId } = useJobPosts();

  const {
    data: jobPostData,
    isLoading: isLoadingJobPost,
    error: jobPostError,
  } = useGetJobPost({ jobPostId });

  return (
    <Box>
      <Divider sx={{ my: 2 }} />

      <Container maxWidth="lg" sx={{ my: 3 }}>
        <JobPostSplitLayout
          jobPost={jobPostData?.job_post}
          isLoadingJobPost={isLoadingJobPost}
          jobPostError={jobPostError}
        />
      </Container>
    </Box>
  );
}

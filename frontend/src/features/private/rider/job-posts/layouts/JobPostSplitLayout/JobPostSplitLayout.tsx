import { Alert, Grid } from "@mui/material";
import { useJobPosts } from "@rider/contexts/JobPostsProvider";
import { useGetJobPost } from "@rider/hooks/job-posts/useGetJobPost";
import JobPostCountAndSort from "@rider/job-posts/JobPostCountAndSort";
import JobPostDetails from "@rider/job-posts/JobPostDetails";
import JobPostList from "@rider/job-posts/JobPostList";

import Spinner from "@/components/common/Spinner";

export default function JobPostSplitLayout() {
  const { jobPostId } = useJobPosts();

  const {
    data: jobPostData,
    isLoading: isLoadingJobPost,
    error: jobPostError,
  } = useGetJobPost({ jobPostId });

  return (
    <Grid container spacing={4}>
      <Grid size={5}>
        <JobPostCountAndSort />
        <JobPostList />
      </Grid>

      <Grid size={7}>
        {isLoadingJobPost && <Spinner />}

        {jobPostError && <Alert severity="error">{jobPostError.message}</Alert>}

        {!isLoadingJobPost && !jobPostError && jobPostData?.job_post && (
          <JobPostDetails jobPost={jobPostData?.job_post} />
        )}
      </Grid>
    </Grid>
  );
}

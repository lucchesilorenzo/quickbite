import { Alert, Grid } from "@mui/material";
import JobPostCountAndSort from "@rider/job-posts/JobPostCountAndSort";
import JobPostDetails from "@rider/job-posts/JobPostDetails";
import JobPostList from "@rider/job-posts/JobPostList";
import { JobPostWithRestaurantAndAlreadyApplied } from "@rider/types/job-posts/job-post.types";

import Spinner from "@/components/common/Spinner";

type JobPostSplitLayoutProps = {
  jobPost?: JobPostWithRestaurantAndAlreadyApplied;
  isLoadingJobPost: boolean;
  jobPostError: Error | null;
};

export default function JobPostSplitLayout({
  jobPost,
  isLoadingJobPost,
  jobPostError,
}: JobPostSplitLayoutProps) {
  return (
    <Grid container spacing={4}>
      <Grid size={5} sx={{ height: "100vh", overflowY: "auto", pr: 2 }}>
        <JobPostCountAndSort />
        <JobPostList />
      </Grid>

      <Grid size={7}>
        {isLoadingJobPost && <Spinner />}

        {jobPostError && <Alert severity="error">{jobPostError.message}</Alert>}

        {!isLoadingJobPost && !jobPostError && jobPost && (
          <JobPostDetails jobPost={jobPost} />
        )}
      </Grid>
    </Grid>
  );
}

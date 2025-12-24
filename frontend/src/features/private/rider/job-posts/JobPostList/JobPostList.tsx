import { useEffect } from "react";

import { Alert, Box, CircularProgress, Stack } from "@mui/material";
import { useJobPosts } from "@rider/contexts/JobPostsProvider";
import { useInView } from "react-intersection-observer";

import JobPostItem from "../JobPostItem";

import Spinner from "@/components/common/Spinner";

export default function JobPostList() {
  const {
    jobPostPages,
    isLoadingJobPosts,
    jobPostsError,
    isFetchingNextPage,
    fetchNextPage,
  } = useJobPosts();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  if (isLoadingJobPosts) {
    return <Spinner />;
  }

  if (jobPostsError) {
    return <Alert severity="error">{jobPostsError.message}</Alert>;
  }

  if (!jobPostPages?.length) {
    return <Alert severity="error">No job posts found.</Alert>;
  }

  return (
    <Stack spacing={2}>
      {jobPostPages.map((jobPost) => (
        <JobPostItem key={jobPost.id} jobPost={jobPost} />
      ))}

      <Box ref={ref} sx={{ alignSelf: "center" }}>
        {isFetchingNextPage && (
          <CircularProgress aria-label="fetching more job posts" size={30} />
        )}
      </Box>
    </Stack>
  );
}

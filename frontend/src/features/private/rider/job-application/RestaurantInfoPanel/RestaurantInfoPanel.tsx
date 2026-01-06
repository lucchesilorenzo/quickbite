import { Alert, Box, Paper, Skeleton, Stack, Typography } from "@mui/material";

import { useJobApplication } from "../../contexts/JobApplicationProvider";

import env from "@/lib/env";

export default function RestaurantInfoPanel() {
  const { jobPostData, isLoadingJobPost, jobPostError } = useJobApplication();

  if (isLoadingJobPost) {
    return (
      <Box role="region" aria-busy="true" aria-label="Restaurant info loading">
        <Skeleton height={100} animation="wave" variant="rectangular" />
      </Box>
    );
  }

  if (jobPostError) {
    return <Alert severity="error">{jobPostError.message} </Alert>;
  }

  return (
    <Paper variant="outlined" sx={{ py: 2, px: 4 }}>
      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
        <Box
          component="img"
          src={`${env.VITE_BASE_URL}${jobPostData?.job_post.restaurant.logo}`}
          alt={jobPostData?.job_post.restaurant.name}
          sx={{
            objectFit: "cover",
            width: 70,
            height: 70,
            border: "1px solid #cccc",
            borderRadius: 2,
          }}
        />

        <Box>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            {jobPostData?.job_post.title}
          </Typography>

          <Typography variant="caption" color="textSecondary">
            {jobPostData?.job_post.restaurant.name} -{" "}
            {jobPostData?.job_post.restaurant.city},{" "}
            {jobPostData?.job_post.restaurant.country}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
}

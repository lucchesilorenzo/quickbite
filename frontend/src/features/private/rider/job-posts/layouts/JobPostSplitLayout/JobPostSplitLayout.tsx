import { Grid } from "@mui/material";
import JobPostList from "@rider/job-posts/JobPostList";

export default function JobPostSplitLayout() {
  return (
    <Grid container spacing={4}>
      <Grid size={5}>
        <JobPostList />
      </Grid>

      <Grid size={7}>JobPostDetails</Grid>
    </Grid>
  );
}

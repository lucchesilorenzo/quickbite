import { useEffect } from "react";

import { Box, Container, Divider } from "@mui/material";
import JobPostFilters from "@rider/job-posts/JobPostFilters/JobPostFilters";
import JobPostSplitLayout from "@rider/job-posts/layouts/JobPostSplitLayout";

export default function RiderJobPostsPage() {
  useEffect(() => {
    document.title = "Job posts | QuickBite";
  }, []);

  return (
    <Box component="main">
      <Container maxWidth="md" sx={{ my: 3 }}>
        <JobPostFilters />
      </Container>

      <Divider sx={{ my: 2 }} />

      <Container maxWidth="lg" sx={{ my: 3 }}>
        <JobPostSplitLayout />
      </Container>
    </Box>
  );
}

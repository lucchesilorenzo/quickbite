import { useEffect } from "react";

import { Container } from "@mui/material";
import JobPostFilters from "@private/rider/job-posts/JobPostFilters/JobPostFilters";

export default function RiderJobPostsPage() {
  useEffect(() => {
    document.title = "Job posts | QuickBite";
  }, []);

  return (
    <Container component="main" maxWidth="md" sx={{ my: 3 }}>
      <JobPostFilters />
    </Container>
  );
}

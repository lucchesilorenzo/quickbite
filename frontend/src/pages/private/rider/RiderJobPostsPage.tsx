import { useEffect } from "react";

import { Box, Container, useMediaQuery } from "@mui/material";
import JobPostFilters from "@rider/job-posts/JobPostFilters/JobPostFilters";
import JobPostsLayoutDesktop from "@rider/job-posts/layouts/JobPostsLayoutDesktop/JobPostsLayoutDesktop";
import JobPostsLayoutMobile from "@rider/job-posts/layouts/JobPostsLayoutMobile";

export default function RiderJobPostsPage() {
  useEffect(() => {
    document.title = "Job posts | QuickBite";
  }, []);

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <Box component="main">
      <Container maxWidth="md" sx={{ my: 3 }}>
        <JobPostFilters />
      </Container>

      {!isMobile ? <JobPostsLayoutDesktop /> : <JobPostsLayoutMobile />}
    </Box>
  );
}

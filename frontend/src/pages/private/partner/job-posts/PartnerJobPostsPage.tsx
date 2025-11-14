import { useEffect } from "react";

import { Container } from "@mui/material";
import HeadingBlock from "@partner/components/HeadingBlock";

import JobPostsTable from "@/features/private/partner/restaurant/job-posts/JobPostsTable";

export default function PartnerJobPostsPage() {
  useEffect(() => {
    document.title = "Job posts | QuickBite";
  }, []);

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 3 }}>
      <HeadingBlock
        title="Job posts"
        description="Create and manage your job posts"
      />
      <JobPostsTable />
    </Container>
  );
}

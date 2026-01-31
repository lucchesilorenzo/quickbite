import { useEffect } from "react";

import { Container } from "@mui/material";
import JobApplicationsTable from "@partner/restaurant/job-applications/JobApplicationsTable";

import HeadingBlock from "@/components/common/HeadingBlock";

export default function PartnerJobApplicationsPage() {
  useEffect(() => {
    document.title = "Job applications | QuickBite";
  }, []);

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 3 }}>
      <HeadingBlock
        title="Job applications"
        description="Manage job applications"
        backButton
      />
      <JobApplicationsTable />
    </Container>
  );
}

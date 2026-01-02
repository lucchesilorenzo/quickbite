import { useEffect } from "react";

import { Box } from "@mui/material";
import JobPostApplicationProvider from "@rider/contexts/JobPostApplicationProvider";
import JobApplicationWizard from "@rider/job-application/JobApplicationWizard";

export default function RiderJobPostApplicationPage() {
  useEffect(() => {
    document.title = "Job post application | QuickBite";
  }, []);

  return (
    <JobPostApplicationProvider>
      <Box component="main">
        <JobApplicationWizard />
      </Box>
    </JobPostApplicationProvider>
  );
}

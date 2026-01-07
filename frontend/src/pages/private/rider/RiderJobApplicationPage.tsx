import { useEffect } from "react";

import { Box } from "@mui/material";
import JobApplicationProvider from "@rider/contexts/JobApplicationProvider";
import JobApplicationWizard from "@rider/job-application/JobApplicationWizard";

export default function RiderJobApplicationPage() {
  useEffect(() => {
    document.title = "Job application | QuickBite";
  }, []);

  return (
    <JobApplicationProvider>
      <Box component="main">
        <JobApplicationWizard />
      </Box>
    </JobApplicationProvider>
  );
}

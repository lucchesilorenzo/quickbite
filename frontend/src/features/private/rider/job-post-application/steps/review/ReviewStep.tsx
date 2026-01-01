import { Box, Typography } from "@mui/material";

import ContactInfoSection from "./sections/ContactInfoSection";

type ReviewStepProps = {
  onBack: (step?: number) => void;
};

export default function ReviewStep({ onBack }: ReviewStepProps) {
  return (
    <Box>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
          Review your application
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          You can't edit your application once you submit.
        </Typography>
      </Box>

      <ContactInfoSection onBack={onBack} />
    </Box>
  );
}

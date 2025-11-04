import { Box, Stack, Typography } from "@mui/material";
import { requirements } from "@rider/lib/utils/requirements";

import RequirementCard from "../RequirementCard";

export default function RequirementsStep() {
  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
        Requirements
      </Typography>

      <Typography variant="body1" sx={{ mb: 4 }}>
        To apply, you must meet the following requirements:
      </Typography>

      <Stack spacing={2}>
        {requirements.map((requirement) => (
          <RequirementCard key={requirement.title} requirement={requirement} />
        ))}
      </Stack>
    </Box>
  );
}

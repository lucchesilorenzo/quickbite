import { Box, Stack, Typography } from "@mui/material";

import RequirementCard from "./RequirementCard";

const requirements = [
  {
    backgroundColor: "#fba7b0",
    title: "You must be at least 18 years old",
    description:
      "If you're younger, you can still submit your application and we'll contact you once you turn 18.",
  },
  {
    backgroundColor: "#fec155",
    title: "You must have a valid identity document",
    description: "For example, a national ID card or passport.",
  },
  {
    backgroundColor: "#bddade",
    title: "If you are not an Italian citizen",
    description:
      "You must have a valid residence permit that allows you to work in Italy.",
  },
  {
    backgroundColor: "#efedea",
    title: "You must have a valid driver's license and a vehicle",
    description:
      "If you plan to use a scooter, motorcycle, or car, you must have a valid driver's license and active insurance. For bicycles, no license is required.",
  },
];

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

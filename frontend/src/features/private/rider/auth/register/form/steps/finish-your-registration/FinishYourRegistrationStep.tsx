import { Box, Typography } from "@mui/material";

export default function FinishYourRegistrationStep() {
  return (
    <Box>
      <Typography
        variant="h5"
        sx={{ textAlign: "center", fontWeight: 600, mb: 3 }}
      >
        You're almost done!
      </Typography>

      <Typography variant="body1" sx={{ textAlign: "center", mb: 2 }}>
        Please review the information you provided. When you're ready, submit
        your registration.
      </Typography>
    </Box>
  );
}

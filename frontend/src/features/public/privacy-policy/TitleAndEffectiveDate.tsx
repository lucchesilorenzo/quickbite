import { Box, Typography } from "@mui/material";

export default function TitleAndEffectiveDate() {
  return (
    <Box>
      <Typography component="p" variant="body2" sx={{ fontWeight: 700, mt: 6 }}>
        Privacy Policy
      </Typography>

      <Typography component="p" variant="body2" sx={{ mt: 2 }}>
        Effective date: July 2025
      </Typography>
    </Box>
  );
}

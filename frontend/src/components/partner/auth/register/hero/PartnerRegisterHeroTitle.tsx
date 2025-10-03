import { Box, Typography } from "@mui/material";

export default function PartnerRegisterHeroTitle() {
  return (
    <Box sx={{ width: "500px" }}>
      <Typography variant="h3">
        The missing ingredient{" "}
        <Typography component="span" variant="h3" sx={{ fontWeight: 600 }}>
          to your success
        </Typography>
      </Typography>
    </Box>
  );
}

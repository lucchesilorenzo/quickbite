import { Box } from "@mui/material";

import Hero from "../hero/Hero";

export default function DesktopPartnerRegisterLayout() {
  return (
    <Box component="main" sx={{ display: { xs: "none", lg: "block" } }}>
      <Hero />
    </Box>
  );
}

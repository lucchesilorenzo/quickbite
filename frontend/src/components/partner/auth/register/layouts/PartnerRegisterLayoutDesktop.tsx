import { Box } from "@mui/material";

import PartnerRegisterHero from "../hero/PartnerRegisterHero";

export default function PartnerRegisterLayoutDesktop() {
  return (
    <Box component="main" sx={{ display: { xs: "none", lg: "block" } }}>
      <PartnerRegisterHero />
    </Box>
  );
}

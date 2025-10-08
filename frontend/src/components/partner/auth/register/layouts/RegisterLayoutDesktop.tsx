import { Box } from "@mui/material";

import RegisterHero from "../hero/RegisterHero";

export default function RegisterLayoutDesktop() {
  return (
    <Box component="main" sx={{ display: { xs: "none", lg: "block" } }}>
      <RegisterHero />
    </Box>
  );
}

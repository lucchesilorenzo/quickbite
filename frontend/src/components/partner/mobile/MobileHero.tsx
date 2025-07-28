import { Box } from "@mui/material";

import MobileHeroBackground from "./MobileHeroBackground";
import MobileHeroTitle from "./MobileHeroTitle";

export default function MobileHero() {
  return (
    <Box sx={{ position: "relative" }}>
      <MobileHeroBackground />
      <MobileHeroTitle />
    </Box>
  );
}

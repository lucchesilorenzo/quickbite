import { Box } from "@mui/material";

import RegisterHeroBackground from "../RegisterHeroBackground";
import RegisterHeroTitleMobile from "./RegisterHeroTitleMobile";

export default function RegisterHeroMobile() {
  return (
    <Box sx={{ position: "relative" }}>
      <RegisterHeroBackground />
      <RegisterHeroTitleMobile />
    </Box>
  );
}

import { Box } from "@mui/material";

import RegisterHeroBackgroundMobile from "./RegisterHeroBackgroundMobile";
import RegisterHeroTitleMobile from "./RegisterHeroTitleMobile";

export default function RegisterHeroMobile() {
  return (
    <Box sx={{ position: "relative" }}>
      <RegisterHeroBackgroundMobile />
      <RegisterHeroTitleMobile />
    </Box>
  );
}

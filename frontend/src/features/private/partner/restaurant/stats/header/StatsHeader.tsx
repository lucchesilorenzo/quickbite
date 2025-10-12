import { Stack, useMediaQuery } from "@mui/material";

import StatsHeaderLeft from "./left/StatsHeaderLeft";
import StatsHeaderRight from "./right/StatsHeaderRight";

export default function StatsHeader() {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Stack
      direction={isMobile ? "column" : "row"}
      spacing={isMobile ? 2 : 0}
      sx={{ justifyContent: "space-between" }}
    >
      <StatsHeaderLeft />
      <StatsHeaderRight />
    </Stack>
  );
}

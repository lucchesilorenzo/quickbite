import { Stack, useMediaQuery } from "@mui/material";

import PartnerStatsHeaderLeft from "./left/PartnerStatsHeaderLeft";
import PartnerStatsHeaderRight from "./right/PartnerStatsHeaderRight";

export default function PartnerStatsHeader() {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Stack
      direction={isMobile ? "column" : "row"}
      spacing={isMobile ? 2 : 0}
      sx={{ justifyContent: "space-between" }}
    >
      <PartnerStatsHeaderLeft />
      <PartnerStatsHeaderRight />
    </Stack>
  );
}

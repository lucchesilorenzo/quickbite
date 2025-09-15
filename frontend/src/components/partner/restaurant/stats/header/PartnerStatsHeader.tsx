import { Stack, useMediaQuery } from "@mui/material";

import PartnerStatsHeaderLeft from "./left/PartnerStatsHeaderLeft";
import PartnerStatsHeaderRight from "./right/PartnerStatsHeaderRight";

export default function PartnerStatsHeader() {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <Stack
      direction={isMobile ? "column" : "row"}
      spacing={isMobile ? 2 : 0}
      sx={{ justifyContent: { sm: "space-between" } }}
    >
      <PartnerStatsHeaderLeft />
      <PartnerStatsHeaderRight />
    </Stack>
  );
}

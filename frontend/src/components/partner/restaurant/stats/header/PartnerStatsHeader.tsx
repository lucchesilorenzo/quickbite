import { Stack } from "@mui/material";

import PartnerStatsHeaderLeft from "./left/PartnerStatsHeaderLeft";
import PartnerStatsHeaderRight from "./right/PartnerStatsHeaderRight";

export default function PartnerStatsHeader() {
  return (
    <Stack direction="row" sx={{ justifyContent: "space-between" }}>
      <PartnerStatsHeaderLeft />
      <PartnerStatsHeaderRight />
    </Stack>
  );
}

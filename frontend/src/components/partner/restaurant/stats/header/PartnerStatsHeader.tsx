import { Stack } from "@mui/material";

import PartnerStatsHeaderLeft from "./PartnerStatsHeaderLeft";

export default function PartnerStatsHeader() {
  return (
    <Stack direction="row" sx={{ justifyContent: "space-between" }}>
      <PartnerStatsHeaderLeft />
    </Stack>
  );
}

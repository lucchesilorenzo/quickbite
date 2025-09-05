import { Stack } from "@mui/material";

import PartnerStatsHeaderRightStatusCard from "./PartnerStatsHeaderRightStatusCard";

export default function PartnerStatsHeaderRight() {
  return (
    <Stack direction="row" spacing={1}>
      <PartnerStatsHeaderRightStatusCard />
    </Stack>
  );
}

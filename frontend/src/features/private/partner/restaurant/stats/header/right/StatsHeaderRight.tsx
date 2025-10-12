import { Stack } from "@mui/material";

import StatsHeaderRightStatusCard from "./StatsHeaderRightStatusCard";

export default function StatsHeaderRight() {
  return (
    <Stack direction="row" spacing={1}>
      <StatsHeaderRightStatusCard />
    </Stack>
  );
}

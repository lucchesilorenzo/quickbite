import { Stack, Typography } from "@mui/material";

import PartnerStatsRangeSelect from "./PartnerStatsRangeSelect";

import { usePartnerRestaurantStats } from "@/hooks/contexts/usePartnerRestaurantStats";
import { getComputedRangeLabel } from "@/lib/utils";

export default function PartnerStatsHeaderLeft() {
  const { range } = usePartnerRestaurantStats();

  const computedRange = getComputedRangeLabel(range);

  return (
    <Stack spacing={2}>
      <Typography variant="h5" sx={{ fontWeight: 600 }}>
        Stats
      </Typography>

      <Typography variant="body2">
        Display data in real time {computedRange}
      </Typography>

      <PartnerStatsRangeSelect />
    </Stack>
  );
}

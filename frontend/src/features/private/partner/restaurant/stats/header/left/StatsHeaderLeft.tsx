import { Box } from "@mui/material";
import HeadingBlock from "@partner/components/HeadingBlock";
import { usePartnerStats } from "@partner/contexts/PartnerStatsProvider";
import { getComputedRangeLabel } from "@partner/lib/utils/stats";

import StatsRangeSelect from "./StatsRangeSelect";

export default function StatsHeaderLeft() {
  const { range } = usePartnerStats();

  const computedRange = getComputedRangeLabel(range);

  return (
    <Box>
      <HeadingBlock
        title="Stats"
        description={`Display data in real time ${computedRange}`}
      />

      <StatsRangeSelect />
    </Box>
  );
}

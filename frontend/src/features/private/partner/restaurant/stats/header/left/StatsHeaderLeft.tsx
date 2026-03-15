import { Box } from "@mui/material";
import { useStats } from "@partner/contexts/StatsProvider";

import StatsRangeSelect from "./StatsRangeSelect";

import HeadingBlock from "@/components/common/HeadingBlock";
import { getComputedRangeLabel } from "@/features/private/partner/lib/utils/stats.utils";

export default function StatsHeaderLeft() {
  const { range } = useStats();

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

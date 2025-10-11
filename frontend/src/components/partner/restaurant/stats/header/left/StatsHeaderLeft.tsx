import { Box } from "@mui/material";

import HeadingBlock from "../../../common/HeadingBlock";
import StatsRangeSelect from "./StatsRangeSelect";

import { usePartnerStats } from "@/hooks/contexts/private/partner/usePartnerStats";
import { getComputedRangeLabel } from "@/lib/utils/stats";

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

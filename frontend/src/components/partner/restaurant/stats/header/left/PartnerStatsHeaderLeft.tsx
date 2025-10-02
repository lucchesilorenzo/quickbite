import { Box } from "@mui/material";

import PartnerHeadingBlock from "../../../common/PartnerHeadingBlock";
import PartnerStatsRangeSelect from "./PartnerStatsRangeSelect";

import { usePartnerRestaurantStats } from "@/hooks/contexts/private/partner/usePartnerRestaurantStats";
import { getComputedRangeLabel } from "@/lib/utils";

export default function PartnerStatsHeaderLeft() {
  const { range } = usePartnerRestaurantStats();

  const computedRange = getComputedRangeLabel(range);

  return (
    <Box>
      <PartnerHeadingBlock
        title="Stats"
        description={`Display data in real time ${computedRange}`}
      />

      <PartnerStatsRangeSelect />
    </Box>
  );
}

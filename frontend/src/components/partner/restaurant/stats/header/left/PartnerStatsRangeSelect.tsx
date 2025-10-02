import { Box, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import { usePartnerRestaurantStats } from "@/hooks/contexts/private/partner/usePartnerRestaurantStats";
import { statRanges } from "@/lib/data";
import { StatRange } from "@/types";

export default function PartnerStatsRangeSelect() {
  const { range, setRange } = usePartnerRestaurantStats();

  const [searchParams, setSearchParams] = useSearchParams();

  function handleRangeChange(e: SelectChangeEvent<StatRange>) {
    setRange(e.target.value);

    setSearchParams({
      ...Object.fromEntries(searchParams),
      range: e.target.value !== "all" ? e.target.value : [],
    });
  }

  return (
    <Box>
      <Select
        size="small"
        sx={{ width: { xs: 1, sm: 200 } }}
        value={range}
        onChange={handleRangeChange}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 200,
            },
          },
        }}
      >
        {statRanges.map(({ value, label }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}

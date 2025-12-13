import { Box, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useStats } from "@partner/contexts/StatsProvider";
import { statRanges } from "@partner/lib/constants/stats";
import { StatRange } from "@partner/types/stats/stats.types";
import { useSearchParams } from "react-router-dom";

export default function StatsRangeSelect() {
  const { range } = useStats();

  const [searchParams, setSearchParams] = useSearchParams();

  function handleRangeChange(e: SelectChangeEvent<StatRange>) {
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

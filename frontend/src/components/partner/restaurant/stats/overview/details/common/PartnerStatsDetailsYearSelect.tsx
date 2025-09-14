import {
  MenuItem,
  Select,
  SelectChangeEvent,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

import { usePartnerRestaurantStats } from "@/hooks/contexts/usePartnerRestaurantStats";

export default function PartnerStatsDetailsYearSelect() {
  const { statsData, isLoadingStats, activeKpi, range, year, setYear } =
    usePartnerRestaurantStats();

  function handleYearChange(e: SelectChangeEvent<number>) {
    setYear((prev) => ({ ...prev, [activeKpi]: e.target.value }));
  }

  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
      <Typography variant="body1" sx={{ fontWeight: 500 }}>
        Year
      </Typography>

      {isLoadingStats ? (
        <Skeleton variant="rounded" width={200} height={40} animation="wave" />
      ) : (
        <Select
          size="small"
          sx={{ width: 200 }}
          value={year[activeKpi]}
          onChange={handleYearChange}
          disabled={range !== "all"}
          MenuProps={{
            PaperProps: {
              style: { maxHeight: 200 },
            },
          }}
        >
          {statsData.filters.years.map((year, index) => (
            <MenuItem key={index} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      )}
    </Stack>
  );
}

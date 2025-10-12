import {
  MenuItem,
  Select,
  SelectChangeEvent,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

import { usePartnerStats } from "@/features/private/partner/contexts/PartnerStatsProvider";

export default function StatsDetailsYearSelect() {
  const { statsData, isLoadingStats, activeKpi, range, year, setYear } =
    usePartnerStats();

  const currentYear = new Date().getFullYear();

  const availableYears =
    statsData.filters.years.length > 0
      ? statsData.filters.years
      : [currentYear];

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
          value={year[activeKpi]}
          onChange={handleYearChange}
          disabled={range !== "all"}
          MenuProps={{
            PaperProps: {
              style: { maxHeight: 200 },
            },
          }}
        >
          {availableYears.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      )}
    </Stack>
  );
}

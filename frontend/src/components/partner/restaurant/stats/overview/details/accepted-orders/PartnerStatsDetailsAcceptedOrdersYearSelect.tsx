import {
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";

import { usePartnerRestaurantStats } from "@/hooks/contexts/usePartnerRestaurantStats";

export default function PartnerStatsDetailsAcceptedOrdersYearSelect() {
  const { statsData, year, setYear } = usePartnerRestaurantStats();

  function handleYearChange(e: SelectChangeEvent<number>) {
    setYear(e.target.value);
  }

  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
      <Typography variant="body1" sx={{ fontWeight: 500 }}>
        Year
      </Typography>

      <Select
        size="small"
        sx={{ width: 200 }}
        value={statsData.filters.years.includes(year) ? year : ""}
        onChange={handleYearChange}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 200,
            },
          },
        }}
      >
        {statsData.filters.years.map((year, index) => (
          <MenuItem key={index} value={year}>
            {year}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
}

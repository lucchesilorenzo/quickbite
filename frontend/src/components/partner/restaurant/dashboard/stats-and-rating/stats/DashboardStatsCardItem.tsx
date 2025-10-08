import { Grid, Stack, Typography } from "@mui/material";

import { formatCurrency } from "@/lib/utils";

type DashboardStatsCardItemProps = {
  stat: {
    title: string;
    value: number;
    currency: boolean;
  };
};

export default function DashboardStatsCardItem({
  stat,
}: DashboardStatsCardItemProps) {
  const computedValue = stat.currency
    ? formatCurrency(stat.value)
    : new Intl.NumberFormat("it-IT").format(stat.value);

  return (
    <Grid size={6}>
      <Stack spacing={1}>
        <Typography variant="body2">{stat.title}</Typography>

        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          {computedValue}
        </Typography>
      </Stack>
    </Grid>
  );
}

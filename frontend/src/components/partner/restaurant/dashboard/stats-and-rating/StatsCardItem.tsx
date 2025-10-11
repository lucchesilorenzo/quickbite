import { Grid, Stack, Typography } from "@mui/material";

import { formatCurrency } from "@/lib/utils/formatting";

type StatsCardItemProps = {
  stat: {
    title: string;
    value: number;
    currency: boolean;
  };
};

export default function StatsCardItem({ stat }: StatsCardItemProps) {
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

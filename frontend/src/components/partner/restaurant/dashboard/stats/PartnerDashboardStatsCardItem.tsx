import { Stack, Typography } from "@mui/material";

type PartnerDashboardStatsCardItemProps = {
  stat: {
    title: string;
    value: string;
  };
};

export default function PartnerDashboardStatsCardItem({
  stat,
}: PartnerDashboardStatsCardItemProps) {
  return (
    <Stack spacing={1}>
      <Typography variant="body2">{stat.title}</Typography>

      <Typography variant="h5" sx={{ fontWeight: 700 }}>
        {stat.value}
      </Typography>
    </Stack>
  );
}

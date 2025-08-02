import { Card, Stack } from "@mui/material";

import PartnerDashboardStatsCardItem from "./PartnerDashboardStatsCardItem";

export default function PartnerDashboardStatsCard() {
  const stats = [
    { title: "Today's earnings", value: "0 €" },
    { title: "Accepted orders", value: "0" },
    { title: "Rejected orders", value: "0" },
  ];

  return (
    <Card variant="outlined" sx={{ p: 2, height: 1 }}>
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        {stats.map((stat) => (
          <PartnerDashboardStatsCardItem key={stat.title} stat={stat} />
        ))}
      </Stack>
    </Card>
  );
}

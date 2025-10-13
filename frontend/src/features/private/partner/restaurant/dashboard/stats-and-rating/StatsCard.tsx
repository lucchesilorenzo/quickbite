import { Card, Grid } from "@mui/material";
import { useRestaurant } from "@partner/contexts/RestaurantProvider";
import { useGetDashboardStats } from "@partner/hooks/restaurants/stats/useGetDashboardStats";
import { dashboardStatsDefaults } from "@partner/lib/query-defaults";

import StatsCardItem from "./StatsCardItem";

import Spinner from "@/components/Spinner";

export default function StatsCard() {
  const { restaurant } = useRestaurant();

  const { data: stats = dashboardStatsDefaults, isLoading: isLoadingStats } =
    useGetDashboardStats(restaurant.id);

  const computedStats = [
    { title: "Today's earnings", value: stats.earnings_today, currency: true },
    { title: "Pending orders", value: stats.pending_orders, currency: false },
    { title: "Accepted orders", value: stats.accepted_orders, currency: false },
    { title: "Rejected orders", value: stats.rejected_orders, currency: false },
  ];

  if (isLoadingStats) return <Spinner />;

  return (
    <Card variant="outlined" sx={{ p: 2 }}>
      <Grid container spacing={2}>
        {computedStats.map((stat) => (
          <StatsCardItem key={stat.title} stat={stat} />
        ))}
      </Grid>
    </Card>
  );
}

import { Card, Grid } from "@mui/material";

import StatsCardItem from "./StatsCardItem";

import Spinner from "@/components/common/Spinner";
import { usePartnerRestaurant } from "@/contexts/private/partner/PartnerRestaurantProvider";
import { useGetDashboardStats } from "@/hooks/react-query/private/partner/restaurants/stats/useGetDashboardStats";
import { partnerRestaurantDashboardStatsDefaults } from "@/lib/query-defaults";

export default function StatsCard() {
  const { restaurant } = usePartnerRestaurant();

  const {
    data: stats = partnerRestaurantDashboardStatsDefaults,
    isLoading: isLoadingStats,
  } = useGetDashboardStats(restaurant.id);

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

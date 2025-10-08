import { Card, Grid } from "@mui/material";

import DashboardStatsCardItem from "./DashboardStatsCardItem";

import Spinner from "@/components/common/Spinner";
import { usePartnerRestaurant } from "@/hooks/contexts/private/partner/usePartnerRestaurant";
import { useGetPartnerRestaurantDashboardStats } from "@/hooks/react-query/private/partner/restaurants/stats/useGetPartnerRestaurantDashboardStats";
import { partnerRestaurantDashboardStatsDefaults } from "@/lib/query-defaults";

export default function DashboardStatsCard() {
  const { restaurant } = usePartnerRestaurant();

  const {
    data: stats = partnerRestaurantDashboardStatsDefaults,
    isLoading: isLoadingStats,
  } = useGetPartnerRestaurantDashboardStats(restaurant.id);

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
          <DashboardStatsCardItem key={stat.title} stat={stat} />
        ))}
      </Grid>
    </Card>
  );
}

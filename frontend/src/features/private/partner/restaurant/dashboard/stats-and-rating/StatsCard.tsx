import { Alert, Card, Grid } from "@mui/material";
import { useRestaurant } from "@partner/contexts/RestaurantProvider";
import { useGetDashboardStats } from "@partner/hooks/restaurants/stats/useGetDashboardStats";
import { dashboardStatsDefaults } from "@partner/lib/query-defaults";

import StatsCardItem from "./StatsCardItem";

import Spinner from "@/components/common/Spinner";

export default function StatsCard() {
  const { restaurantData } = useRestaurant();

  const {
    data: dashboardStatData = {
      success: false,
      message: "",
      ...dashboardStatsDefaults,
    },
    isLoading: isLoadingDashboardStats,
    error: dashboardStatsError,
  } = useGetDashboardStats({ restaurantId: restaurantData.restaurant.id });

  const computedStats = [
    {
      title: "Today's earnings",
      value: dashboardStatData.earnings_today,
      currency: true,
    },
    {
      title: "Pending orders",
      value: dashboardStatData.pending_orders,
      currency: false,
    },
    {
      title: "Accepted orders",
      value: dashboardStatData.accepted_orders,
      currency: false,
    },
    {
      title: "Rejected orders",
      value: dashboardStatData.rejected_orders,
      currency: false,
    },
  ];

  if (isLoadingDashboardStats) {
    return <Spinner />;
  }

  if (dashboardStatsError) {
    return <Alert severity="error">{dashboardStatsError.message}</Alert>;
  }

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

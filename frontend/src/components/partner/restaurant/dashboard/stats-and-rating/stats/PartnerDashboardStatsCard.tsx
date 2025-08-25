import { Card, Stack } from "@mui/material";

import PartnerDashboardStatsCardItem from "./PartnerDashboardStatsCardItem";

import Spinner from "@/components/common/Spinner";
import { usePartnerRestaurant } from "@/hooks/contexts/usePartnerRestaurant";
import { useGetPartnerRestaurantStats } from "@/hooks/react-query/private/partners/restaurants/stats/useGetPartnerRestaurantStats";

export default function PartnerDashboardStatsCard() {
  const { restaurant } = usePartnerRestaurant();

  const { data: stats, isLoading: isLoadingStats } =
    useGetPartnerRestaurantStats(restaurant.id);

  const computedStats = [
    { title: "Today's earnings", value: stats.earnings_today, currency: true },
    { title: "Accepted orders", value: stats.accepted_orders, currency: false },
    { title: "Rejected orders", value: stats.rejected_orders, currency: false },
  ];

  if (isLoadingStats) return <Spinner />;

  return (
    <Card variant="outlined" sx={{ p: 2, height: 1 }}>
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        {computedStats.map((stat) => (
          <PartnerDashboardStatsCardItem key={stat.title} stat={stat} />
        ))}
      </Stack>
    </Card>
  );
}

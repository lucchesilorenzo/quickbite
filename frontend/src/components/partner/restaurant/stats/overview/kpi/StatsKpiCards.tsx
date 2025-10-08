import { Grid } from "@mui/material";

import StatsKpiCard from "./StatsKpiCard";

import { usePartnerRestaurantStats } from "@/hooks/contexts/private/partner/usePartnerRestaurantStats";
import { formatCurrency } from "@/lib/utils";
import { Kpi } from "@/types";

export default function StatsKpiCards() {
  const { kpiSummary, activeKpi } = usePartnerRestaurantStats();

  const cards: { key: Kpi; value: string; title: string; color: string }[] = [
    {
      key: "accepted_orders",
      value: new Intl.NumberFormat("it-IT").format(kpiSummary.accepted_orders),
      title: "Accepted orders",
      color: "success",
    },
    {
      key: "revenue",
      value: formatCurrency(kpiSummary.revenue),
      title: "Revenue",
      color: "success",
    },
    {
      key: "rejected_orders",
      value: new Intl.NumberFormat("it-IT").format(kpiSummary.rejected_orders),
      title: "Rejected orders",
      color: "error",
    },
    {
      key: "lost_revenue",
      value: formatCurrency(kpiSummary.lost_revenue),
      title: "Lost revenue",
      color: "error",
    },
  ];

  return (
    <Grid container sx={{ mt: 6 }}>
      {cards.map((card, i) => {
        const isActive = activeKpi === card.key;
        const nextCard = cards[i + 1];
        const nextCardActive = nextCard ? activeKpi === nextCard.key : false;

        return (
          <StatsKpiCard
            key={card.key}
            card={card}
            isActive={isActive}
            isLast={i === cards.length - 1}
            shouldHideDivider={isActive || nextCardActive}
          />
        );
      })}
    </Grid>
  );
}

import { Grid } from "@mui/material";

import PartnerStatsKpiCard from "./PartnerStatsKpiCard";

import { usePartnerRestaurantStats } from "@/hooks/contexts/usePartnerRestaurantStats";
import { formatCurrency } from "@/lib/utils";
import { Kpi } from "@/types";

export default function PartnerStatsKpiCards() {
  const { activeKpi } = usePartnerRestaurantStats();

  // TODO: Fetch stats

  const cards: { key: Kpi; value: string; title: string; color: string }[] = [
    {
      key: "accepted_orders",
      value: new Intl.NumberFormat("it-IT").format(30),
      title: "Accepted orders",
      color: "success",
    },
    {
      key: "revenue",
      value: formatCurrency(10),
      title: "Revenue",
      color: "success",
    },
    {
      key: "rejected_orders",
      value: new Intl.NumberFormat("it-IT").format(20),
      title: "Rejected orders",
      color: "error",
    },
    {
      key: "lost_revenue",
      value: formatCurrency(40),
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
          <PartnerStatsKpiCard
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

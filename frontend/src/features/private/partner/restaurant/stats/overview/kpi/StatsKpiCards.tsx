import { Alert, Grid } from "@mui/material";
import { useStats } from "@partner/contexts/StatsProvider";

import StatsKpiCard from "./StatsKpiCard";

import { Kpi } from "@/api/models";
import { formatCurrency } from "@/lib/utils/formatting.utils";

export default function StatsKpiCards() {
  const { kpiSummary, activeKpi, kpiSummaryError } = useStats();

  const cards: { key: Kpi; value: string; title: string; color: string }[] = [
    {
      key: "accepted_orders",
      value: new Intl.NumberFormat("it-IT").format(
        kpiSummary?.accepted_orders ?? 0,
      ),
      title: "Accepted orders",
      color: "success",
    },
    {
      key: "revenue",
      value: formatCurrency(kpiSummary?.revenue ?? 0),
      title: "Revenue",
      color: "success",
    },
    {
      key: "rejected_orders",
      value: new Intl.NumberFormat("it-IT").format(
        kpiSummary?.rejected_orders ?? 0,
      ),
      title: "Rejected orders",
      color: "error",
    },
    {
      key: "lost_revenue",
      value: formatCurrency(kpiSummary?.lost_revenue ?? 0),
      title: "Lost revenue",
      color: "error",
    },
  ];

  if (kpiSummaryError) {
    return (
      <Alert sx={{ mt: 6, mb: 2 }} severity="error">
        {kpiSummaryError.message}
      </Alert>
    );
  }

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

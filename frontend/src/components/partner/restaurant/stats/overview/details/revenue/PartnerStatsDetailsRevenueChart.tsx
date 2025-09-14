import { LineChart } from "@mui/x-charts";

import { usePartnerRestaurantStats } from "@/hooks/contexts/usePartnerRestaurantStats";
import { formatCurrency } from "@/lib/utils";

export default function PartnerStatsDetailsRevenueChart() {
  const { statsData, range, isLoadingStats } = usePartnerRestaurantStats();

  const label = range === "all" ? "Month" : "Day of the month";

  return (
    <LineChart
      loading={isLoadingStats}
      sx={{
        "& .MuiChartsAxis-line": {
          stroke: "#efefef !important",
        },
      }}
      colors={["#007840"]}
      height={300}
      xAxis={[
        {
          scaleType: "band",
          disableTicks: true,
          data: statsData.stats.map((d) => d.period),
          label: label,
          offset: 15,
          tickLabelStyle: { fontSize: 11, textTransform: "uppercase" },
          labelStyle: { fontSize: 12, textTransform: "uppercase" },
        },
      ]}
      yAxis={[
        {
          width: 100,
          label: "Revenue",
          data: statsData.stats.map((d) => d.value),
          valueFormatter: (value: number) => formatCurrency(value),
          tickLabelStyle: { fontSize: 11, textTransform: "uppercase" },
          labelStyle: { fontSize: 12, textTransform: "uppercase" },
        },
      ]}
      series={[
        {
          id: "revenue",
          label: "Revenue",
          data: statsData.stats.map((d) => d.value),
          valueFormatter: (value, { dataIndex }) => {
            const orderCount = statsData.stats[dataIndex].total;
            return `${formatCurrency(value || 0)} (${orderCount} delivered orders)`;
          },
        },
      ]}
    />
  );
}

import { LineChart } from "@mui/x-charts";

import { usePartnerStats } from "@/hooks/contexts/private/partner/usePartnerStats";
import { formatCurrency } from "@/lib/utils/formatting";

type StatsDetailsLineChartProps = {
  linePrimaryColor: string;
  lineId: "revenue" | "lost_revenue";
  lineLabel: string;
};

export default function StatsDetailsLineChart({
  linePrimaryColor,
  lineId,
  lineLabel,
}: StatsDetailsLineChartProps) {
  const { statsData, range, isLoadingStats } = usePartnerStats();

  const label = range === "all" ? "Month" : "Day of the month";

  return (
    <LineChart
      loading={isLoadingStats}
      sx={{
        "& .MuiChartsAxis-line": {
          stroke: "#efefef !important",
        },
      }}
      colors={[linePrimaryColor]}
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
          disableLine: true,
          disableTicks: true,
          tickMinStep: 1,
          width: 100,
          label: lineLabel,
          data: statsData.stats.map((d) => d.value),
          valueFormatter: (value: number) => formatCurrency(value),
          labelStyle: { fontSize: 12, textTransform: "uppercase" },
        },
      ]}
      series={[
        {
          id: lineId,
          label: lineLabel,
          data: statsData.stats.map((d) => d.value),
          valueFormatter: (value, { dataIndex }) => {
            const orderCount = statsData.stats[dataIndex].total;
            return `${formatCurrency(value || 0)} (${orderCount} ${
              lineId === "revenue" ? "delivered" : "rejected"
            } orders)`;
          },
        },
      ]}
    />
  );
}

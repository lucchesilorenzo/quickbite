import { BarChart } from "@mui/x-charts/BarChart";

import BarLabel from "../common/BarLabel";

import { usePartnerRestaurantStats } from "@/hooks/contexts/usePartnerRestaurantStats";

export default function PartnerStatsDetailsAcceptedOrdersChart() {
  const { statsData, range, isLoadingStats } = usePartnerRestaurantStats();

  const label = range === "all" ? "Month" : "Day of the month";

  return (
    <BarChart
      loading={isLoadingStats}
      sx={{
        "& .MuiChartsAxis-line": {
          stroke: "#efefef !important",
        },
      }}
      colors={["#007840", "#E0E0E0"]}
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
      yAxis={[{ position: "none" }]}
      series={[
        {
          type: "bar",
          id: "accepted",
          label: "Accepted",
          data: statsData.stats.map((d) => d.value),
          stack: "total",
        },
        {
          type: "bar",
          id: "total",
          label: "Total",
          data: statsData.stats.map((d) => d.total),
          stack: "total",
        },
      ]}
      barLabel={(item) => {
        if (item.seriesId === "accepted") {
          return item.value?.toString();
        }
      }}
      slots={{ barLabel: BarLabel }}
    />
  );
}

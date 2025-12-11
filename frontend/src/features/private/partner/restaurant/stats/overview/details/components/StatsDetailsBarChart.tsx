import { BarChart } from "@mui/x-charts/BarChart";
import { useStats } from "@partner/contexts/StatsProvider";

import BarLabel from "./BarLabel";

import FullPageErrorMessage from "@/components/common/FullPageErrorMessage";

type StatsDetailsBarChartProps = {
  barPrimaryColor: string;
  barSecondaryColor: string;
  barId: "accepted" | "rejected";
  barLabel: string;
};

export default function StatsDetailsBarChart({
  barPrimaryColor,
  barSecondaryColor,
  barId,
  barLabel,
}: StatsDetailsBarChartProps) {
  const { statsData, range, isLoadingStats, statsError } = useStats();

  const label = range === "all" ? "Month" : "Day of the month";

  if (statsError) {
    return <FullPageErrorMessage message={statsError.message} />;
  }

  return (
    <BarChart
      loading={isLoadingStats}
      sx={{
        "& .MuiChartsAxis-line": {
          stroke: "#efefef !important",
        },
      }}
      colors={[barPrimaryColor, barSecondaryColor]}
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
          id: barId,
          label: barLabel,
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
        if (item.seriesId === barId) {
          return item.value?.toString();
        }
      }}
      slots={{ barLabel: BarLabel }}
    />
  );
}

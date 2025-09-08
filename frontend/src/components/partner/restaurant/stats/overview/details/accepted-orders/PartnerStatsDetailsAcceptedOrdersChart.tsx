import { BarChart } from "@mui/x-charts/BarChart";

import BarLabel from "../common/BarLabel";

const data = [
  { day: "29 Giu", total: 30, accepted: 14 },
  { day: "30 Giu", total: 30, accepted: 15 },
  { day: "1 Lug", total: 30, accepted: 30 },
  { day: "2 Lug", total: 30, accepted: 16 },
  { day: "3 Lug", total: 30, accepted: 8 },
  { day: "4 Lug", total: 30, accepted: 13 },
  { day: "5 Lug", total: 30, accepted: 20 },
];

export default function PartnerStatsDetailsAcceptedOrdersChart() {
  return (
    <BarChart
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
          data: data.map((d) => d.day),
          label: "Day of the month",
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
          data: data.map((d) => d.accepted),
          stack: "total",
        },
        {
          type: "bar",
          id: "total",
          label: "Total",
          data: data.map((d) => d.total - d.accepted),
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

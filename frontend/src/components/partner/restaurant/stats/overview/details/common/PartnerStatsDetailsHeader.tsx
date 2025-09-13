import { Stack, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import PartnerStatsDetailsAcceptedOrdersPaymentSelect from "../accepted-orders/PartnerStatsDetailsAcceptedOrdersPaymentSelect";
import PartnerStatsDetailsYearSelect from "./PartnerStatsDetailsYearSelect";

import { usePartnerRestaurantStats } from "@/hooks/contexts/usePartnerRestaurantStats";

type PartnerStatsDetailsHeaderProps = {
  title: string;
};

export default function PartnerStatsDetailsHeader({
  title,
}: PartnerStatsDetailsHeaderProps) {
  const [searchParams] = useSearchParams();
  const { range } = usePartnerRestaurantStats();

  const isAcceptedOrdersKpi = searchParams.get("kpi") === "accepted_orders";

  return (
    <Stack
      direction="row"
      sx={{ alignItems: "center", justifyContent: "space-between", mb: 6 }}
    >
      <Typography variant="body1" sx={{ fontWeight: 500 }}>
        {title}
      </Typography>

      <Stack direction="row" spacing={4}>
        {range !== "all" && <PartnerStatsDetailsYearSelect />}
        {isAcceptedOrdersKpi && (
          <PartnerStatsDetailsAcceptedOrdersPaymentSelect />
        )}
      </Stack>
    </Stack>
  );
}

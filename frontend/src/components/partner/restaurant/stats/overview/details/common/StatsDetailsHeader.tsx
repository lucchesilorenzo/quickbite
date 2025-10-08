import { Stack, Typography, useMediaQuery } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import AcceptedOrdersPaymentSelect from "../accepted-orders/AcceptedOrdersPaymentSelect";
import StatsDetailsYearSelect from "./StatsDetailsYearSelect";

type StatsDetailsHeaderProps = {
  title: string;
};

export default function StatsDetailsHeader({ title }: StatsDetailsHeaderProps) {
  const [searchParams] = useSearchParams();

  const isAcceptedOrdersKpi = searchParams.get("kpi") === "accepted_orders";
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <Stack
      direction={isMobile ? "column" : "row"}
      spacing={isMobile ? 4 : 0}
      sx={{
        alignItems: "center",
        justifyContent: { md: "space-between" },
        mb: 6,
        px: 4,
      }}
    >
      <Typography variant="body1" sx={{ fontWeight: 500 }}>
        {title}
      </Typography>

      <Stack direction={isMobile ? "column" : "row"} spacing={isMobile ? 2 : 4}>
        <StatsDetailsYearSelect />
        {isAcceptedOrdersKpi && <AcceptedOrdersPaymentSelect />}
      </Stack>
    </Stack>
  );
}

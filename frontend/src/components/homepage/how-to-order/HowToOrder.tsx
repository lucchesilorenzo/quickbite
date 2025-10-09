import { Stack } from "@mui/material";

import OrderSteps from "./OrderSteps";

import SectionHeader from "@/components/common/SectionHeader";

export default function HowToOrder() {
  return (
    <Stack
      component="section"
      spacing={6}
      sx={{ py: 10, justifyContent: "center", alignItems: "center" }}
    >
      <SectionHeader title="How to order" subtitle="It's as easy as this." />
      <OrderSteps />
    </Stack>
  );
}

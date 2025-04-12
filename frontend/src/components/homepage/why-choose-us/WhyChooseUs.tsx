import { Stack } from "@mui/material";

import WhyChooseUsFeatures from "./WhyChooseUsFeatures";

import SectionHeader from "@/components/common/SectionHeader";

export default function WhyChooseUs() {
  return (
    <Stack
      component="section"
      spacing={6}
      sx={{ py: 10, justifyContent: "center", alignItems: "center" }}
    >
      <SectionHeader title="QuickBite" subtitle="Your time." />

      <WhyChooseUsFeatures />
    </Stack>
  );
}

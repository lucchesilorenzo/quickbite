import { Box } from "@mui/material";

import Hero from "@/components/homepage/hero/Hero";
import HowToOrder from "@/components/homepage/how-to-order/HowToOrder";
import WhyChooseUs from "@/components/homepage/why-choose-us/WhyChooseUs";

export default function HomePage() {
  return (
    <Box component="main">
      <Hero />
      <HowToOrder />
      <WhyChooseUs />
    </Box>
  );
}

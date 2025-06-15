import { Box } from "@mui/material";

import DownloadApp from "@/components/public/homepage/download-app/DownloadApp";
import Hero from "@/components/public/homepage/hero/Hero";
import HowToOrder from "@/components/public/homepage/how-to-order/HowToOrder";
import WhyChooseUs from "@/components/public/homepage/why-choose-us/WhyChooseUs";

export default function HomePage() {
  return (
    <Box component="main">
      <Hero />
      <HowToOrder />
      <DownloadApp />
      <WhyChooseUs />
    </Box>
  );
}

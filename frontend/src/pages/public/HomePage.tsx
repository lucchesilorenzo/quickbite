import { useEffect } from "react";

import { Box } from "@mui/material";

import DownloadApp from "@/components/homepage/download-app/DownloadApp";
import Hero from "@/components/homepage/hero/Hero";
import HowToOrder from "@/components/homepage/how-to-order/HowToOrder";
import WhyChooseUs from "@/components/homepage/why-choose-us/WhyChooseUs";
import env from "@/lib/env";

export default function HomePage() {
  useEffect(() => {
    document.title = env.VITE_APP_NAME;
  }, []);

  return (
    <Box component="main">
      <Hero />
      <HowToOrder />
      <DownloadApp />
      <WhyChooseUs />
    </Box>
  );
}

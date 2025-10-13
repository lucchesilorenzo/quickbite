import { useEffect } from "react";

import { Box } from "@mui/material";
import HomeHero from "@public/homepage/HomeHero";
import DownloadApp from "@public/homepage/download-app/DownloadApp";
import HowToOrder from "@public/homepage/how-to-order/HowToOrder";
import WhyChooseUs from "@public/homepage/why-choose-us/WhyChooseUs";

import env from "@/lib/env";

export default function HomePage() {
  useEffect(() => {
    document.title = env.VITE_APP_NAME;
  }, []);

  return (
    <Box component="main">
      <HomeHero />
      <HowToOrder />
      <DownloadApp />
      <WhyChooseUs />
    </Box>
  );
}

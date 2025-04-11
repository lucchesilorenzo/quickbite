import { Box } from "@mui/material";

import Hero from "@/components/homepage/Hero";
import HowToOrder from "@/components/homepage/HowToOrder";

export default function HomePage() {
  return (
    <Box component="main">
      <Hero />
      <HowToOrder />
    </Box>
  );
}

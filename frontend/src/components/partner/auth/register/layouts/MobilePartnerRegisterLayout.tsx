import { Box } from "@mui/material";

import MobileHero from "@/components/partner/auth/register/mobile/MobileHero";
import MobilePartnerRegisterFormCard from "@/components/partner/auth/register/mobile/MobilePartnerRegisterFormCard";

export default function MobilePartnerRegisterLayout() {
  return (
    <Box component="main" sx={{ display: { xs: "block", lg: "none" } }}>
      <MobileHero />
      <MobilePartnerRegisterFormCard />
    </Box>
  );
}

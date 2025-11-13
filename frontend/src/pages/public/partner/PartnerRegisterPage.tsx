import { useEffect } from "react";

import { Box } from "@mui/material";
import RegisterFormCard from "@partner/auth/register/hero/RegisterFormCard";
import RegisterHero from "@partner/auth/register/hero/RegisterHero";
import RegisterHeroMobile from "@partner/auth/register/hero/mobile/RegisterHeroMobile";

export default function PartnerRegisterPage() {
  useEffect(() => {
    document.title = "Become a partner | QuickBite";
  }, []);

  return (
    <>
      <Box component="main" sx={{ display: { xs: "none", lg: "block" } }}>
        <RegisterHero />
      </Box>

      <Box component="main" sx={{ display: { xs: "block", lg: "none" } }}>
        <RegisterHeroMobile />
        <RegisterFormCard />
      </Box>
    </>
  );
}

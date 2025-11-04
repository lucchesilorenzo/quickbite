import { useEffect } from "react";

import { Box } from "@mui/material";
import HeroBackground from "@rider/auth/register/HeroBackground";
import RegisterWizard from "@rider/auth/register/form/RegisterWizard";

export default function RiderRegisterPage() {
  useEffect(() => {
    document.title = "Become a rider | QuickBite";
  }, []);

  return (
    <Box component="main">
      <HeroBackground />
      <RegisterWizard />
    </Box>
  );
}

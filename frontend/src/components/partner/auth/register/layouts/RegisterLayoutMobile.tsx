import { Box } from "@mui/material";

import RegisterFormCardMobile from "@/components/partner/auth/register/hero/mobile/RegisterFormCardMobile";
import RegisterHeroMobile from "@/components/partner/auth/register/hero/mobile/RegisterHeroMobile";

export default function RegisterLayoutMobile() {
  return (
    <Box component="main" sx={{ display: { xs: "block", lg: "none" } }}>
      <RegisterHeroMobile />
      <RegisterFormCardMobile />
    </Box>
  );
}

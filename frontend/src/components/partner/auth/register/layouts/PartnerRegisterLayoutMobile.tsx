import { Box } from "@mui/material";

import PartnerRegisterFormCardMobile from "@/components/partner/auth/register/hero/mobile/PartnerRegisterFormCardMobile";
import PartnerRegisterHeroMobile from "@/components/partner/auth/register/hero/mobile/PartnerRegisterHeroMobile";

export default function PartnerRegisterLayoutMobile() {
  return (
    <Box component="main" sx={{ display: { xs: "block", lg: "none" } }}>
      <PartnerRegisterHeroMobile />
      <PartnerRegisterFormCardMobile />
    </Box>
  );
}

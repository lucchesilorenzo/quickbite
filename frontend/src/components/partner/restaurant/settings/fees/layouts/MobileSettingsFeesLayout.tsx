import { Box } from "@mui/material";

import MobilePartnerSettingsFeesFormCard from "../mobile/MobilePartnerSettingsFeesFormCard";
import MobilePartnerSettingsFeesHeader from "../mobile/MobilePartnerSettingsFeesHeader";

export default function MobileSettingsFeesLayout() {
  return (
    <Box sx={{ display: { xs: "block", md: "none" } }}>
      <MobilePartnerSettingsFeesHeader />
      <MobilePartnerSettingsFeesFormCard />
    </Box>
  );
}

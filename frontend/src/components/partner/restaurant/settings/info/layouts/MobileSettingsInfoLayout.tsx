import { Box } from "@mui/material";

import MobilePartnerSettingsInfoFormCard from "../mobile/MobilePartnerSettingsInfoFormCard";
import MobilePartnerSettingsInfoHeader from "../mobile/MobilePartnerSettingsInfoHeader";

export default function MobileSettingsInfoLayout() {
  return (
    <Box sx={{ display: { xs: "block", md: "none" } }}>
      <MobilePartnerSettingsInfoHeader />
      <MobilePartnerSettingsInfoFormCard />
    </Box>
  );
}

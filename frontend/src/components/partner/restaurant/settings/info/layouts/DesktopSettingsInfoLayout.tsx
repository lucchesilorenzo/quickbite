import { Box } from "@mui/material";

import PartnerSettingsInfoFormCard from "@/components/partner/restaurant/settings/info/PartnerSettingsInfoFormCard";
import PartnerSettingsInfoHeader from "@/components/partner/restaurant/settings/info/PartnerSettingsInfoHeader";

export default function DesktopSettingsInfoLayout() {
  return (
    <Box sx={{ display: { xs: "none", md: "block" } }}>
      <PartnerSettingsInfoHeader />
      <PartnerSettingsInfoFormCard />
    </Box>
  );
}

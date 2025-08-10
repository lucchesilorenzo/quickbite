import { Box } from "@mui/material";

import PartnerSettingsFeesFormCard from "../PartnerSettingsFeesFormCard";
import PartnerSettingsFeesHeader from "../PartnerSettingsFeesHeader";

export default function DesktopSettingsFeesLayout() {
  return (
    <Box sx={{ display: { xs: "none", md: "block" } }}>
      <PartnerSettingsFeesHeader />
      <PartnerSettingsFeesFormCard />
    </Box>
  );
}

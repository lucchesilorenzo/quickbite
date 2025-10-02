import { Box } from "@mui/material";

import PartnerSettingsFeesFormCard from "./PartnerSettingsFeesFormCard";
import PartnerSettingsFeesHeader from "./PartnerSettingsFeesHeader";

export default function PartnerSettingsFeesContainer() {
  return (
    <Box>
      <PartnerSettingsFeesHeader />
      <PartnerSettingsFeesFormCard />
    </Box>
  );
}

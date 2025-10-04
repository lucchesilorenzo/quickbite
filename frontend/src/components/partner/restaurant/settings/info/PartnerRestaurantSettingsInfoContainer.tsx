import { Box } from "@mui/material";

import PartnerSettingsInfoFormCard from "@/components/partner/restaurant/settings/info/PartnerSettingsInfoFormCard";
import PartnerSettingsInfoHeader from "@/components/partner/restaurant/settings/info/PartnerSettingsInfoHeader";

export default function PartnerRestaurantSettingsInfoContainer() {
  return (
    <Box>
      <PartnerSettingsInfoHeader />
      <PartnerSettingsInfoFormCard />
    </Box>
  );
}

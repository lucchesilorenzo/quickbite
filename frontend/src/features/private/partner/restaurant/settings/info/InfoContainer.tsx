import { Box } from "@mui/material";

import InfoFormCard from "@/features/private/partner/restaurant/settings/info/InfoFormCard";
import InfoHeader from "@/features/private/partner/restaurant/settings/info/InfoHeader";

export default function InfoContainer() {
  return (
    <Box>
      <InfoHeader />
      <InfoFormCard />
    </Box>
  );
}

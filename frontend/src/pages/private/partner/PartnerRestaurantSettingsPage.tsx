import { useEffect } from "react";

import { Container } from "@mui/material";

import PartnerHeadingBlock from "@/components/partner/restaurant/common/PartnerHeadingBlock";
import PartnerSettingsMainCards from "@/components/partner/restaurant/settings/PartnerSettingsMainCards";

export default function PartnerRestaurantSettingsPage() {
  useEffect(() => {
    document.title = "Settings | QuickBite";
  }, []);

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 3 }}>
      <PartnerHeadingBlock title="Settings" />
      <PartnerSettingsMainCards />
    </Container>
  );
}

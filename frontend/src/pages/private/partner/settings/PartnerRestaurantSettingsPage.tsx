import { useEffect } from "react";

import { Container } from "@mui/material";

import HeadingBlock from "@/components/partner/restaurant/common/HeadingBlock";
import SettingsMainCards from "@/components/partner/restaurant/settings/SettingsMainCards";

export default function PartnerRestaurantSettingsPage() {
  useEffect(() => {
    document.title = "Settings | QuickBite";
  }, []);

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 3 }}>
      <HeadingBlock title="Settings" />
      <SettingsMainCards />
    </Container>
  );
}

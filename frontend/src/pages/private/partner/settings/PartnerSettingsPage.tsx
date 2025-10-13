import { useEffect } from "react";

import { Container } from "@mui/material";
import HeadingBlock from "@partner/components/HeadingBlock";
import SettingsMainCards from "@partner/restaurant/settings/SettingsMainCards";

export default function PartnerSettingsPage() {
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

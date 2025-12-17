import { useEffect } from "react";

import { Container } from "@mui/material";
import SettingsMainCards from "@partner/restaurant/settings/SettingsMainCards";

import HeadingBlock from "@/components/common/HeadingBlock";

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

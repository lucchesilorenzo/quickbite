import { useEffect } from "react";

import { Container, Typography } from "@mui/material";

import PartnerSettingsMainCards from "@/components/partner/restaurant/settings/PartnerSettingsMainCards";

export default function PartnerRestaurantSettingsPage() {
  useEffect(() => {
    document.title = "Settings | QuickBite";
  }, []);

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 4 }}>
        Settings
      </Typography>

      <PartnerSettingsMainCards />
    </Container>
  );
}

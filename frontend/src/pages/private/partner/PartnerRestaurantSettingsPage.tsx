import { Container, Typography } from "@mui/material";

import PartnerSettingsMainCards from "@/components/partner/restaurant/settings/PartnerSettingsMainCards";

export default function PartnerRestaurantSettingsPage() {
  return (
    <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        Settings
      </Typography>

      <PartnerSettingsMainCards />
    </Container>
  );
}

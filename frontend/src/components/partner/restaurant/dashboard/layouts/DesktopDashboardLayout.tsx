import { Container, Stack } from "@mui/material";

import PartnerDashboardRestaurantStatus from "../PartnerDashboardRestaurantStatus";
import PartnerDashboardWelcome from "../PartnerDashboardWelcome";

export default function DesktopDashboardLayout() {
  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{ display: { xs: "none", lg: "block" }, my: 6 }}
    >
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <PartnerDashboardWelcome />
        <PartnerDashboardRestaurantStatus />
      </Stack>
    </Container>
  );
}

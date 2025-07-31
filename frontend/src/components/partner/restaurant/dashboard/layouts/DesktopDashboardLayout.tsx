import { Container } from "@mui/material";

import PartnerDashboardHeader from "../header/PartnerDashboardHeader";
import PartnerDashboardStats from "../stats/PartnerDashboardStats";

export default function DesktopDashboardLayout() {
  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{ display: { xs: "none", lg: "block" }, mt: 6 }}
    >
      <PartnerDashboardHeader />
      <PartnerDashboardStats />
    </Container>
  );
}

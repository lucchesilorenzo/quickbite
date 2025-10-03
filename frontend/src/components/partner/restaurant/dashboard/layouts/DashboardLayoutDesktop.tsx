import { Container } from "@mui/material";

import PartnerDashboardStatsAndRating from "../stats-and-rating/PartnerDashboardStatsAndRating";
import PartnerDashboardStatsTitle from "../stats-and-rating/stats/PartnerDashboardStatsTitle";
import PartnerDashboardWelcomeAndStatus from "../welcome-and-status/PartnerDashboardWelcomeAndStatus";

export default function DashboardLayoutDesktop() {
  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{ display: { xs: "none", md: "block" }, mt: 4 }}
    >
      <PartnerDashboardWelcomeAndStatus />

      <PartnerDashboardStatsTitle />
      <PartnerDashboardStatsAndRating />
    </Container>
  );
}

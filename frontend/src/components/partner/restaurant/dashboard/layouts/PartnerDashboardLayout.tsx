import { Container, Stack } from "@mui/material";

import PartnerDashboardStatsAndRating from "../stats-and-rating/PartnerDashboardStatsAndRating";
import PartnerDashboardStatsTitle from "../stats-and-rating/stats/PartnerDashboardStatsTitle";
import PartnerDashboardWelcomeAndStatus from "../welcome-and-status/PartnerDashboardWelcomeAndStatus";

export default function PartnerDashboardLayout() {
  return (
    <>
      <Container
        component="main"
        maxWidth="md"
        sx={{ display: { xs: "none", sm: "block" }, mt: 4 }}
      >
        <PartnerDashboardWelcomeAndStatus />
        <PartnerDashboardStatsTitle />
        <PartnerDashboardStatsAndRating />
      </Container>

      <Stack
        component="main"
        spacing={2}
        sx={{ display: { xs: "block", sm: "none" }, mt: 3, p: 2 }}
      >
        <PartnerDashboardWelcomeAndStatus />
        <PartnerDashboardStatsTitle />
        <PartnerDashboardStatsAndRating />
      </Stack>
    </>
  );
}

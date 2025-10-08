import { Container, Stack } from "@mui/material";

import DashboardStatsAndRating from "../stats-and-rating/DashboardStatsAndRating";
import DashboardStatsTitle from "../stats-and-rating/stats/DashboardStatsTitle";
import DashboardWelcomeAndStatus from "../welcome-and-status/DashboardWelcomeAndStatus";

export default function DashboardLayout() {
  return (
    <>
      <Container
        component="main"
        maxWidth="md"
        sx={{ display: { xs: "none", sm: "block" }, mt: 4 }}
      >
        <DashboardWelcomeAndStatus />
        <DashboardStatsTitle />
        <DashboardStatsAndRating />
      </Container>

      <Stack
        component="main"
        spacing={2}
        sx={{ display: { xs: "block", sm: "none" }, mt: 3, p: 2 }}
      >
        <DashboardWelcomeAndStatus />
        <DashboardStatsTitle />
        <DashboardStatsAndRating />
      </Stack>
    </>
  );
}

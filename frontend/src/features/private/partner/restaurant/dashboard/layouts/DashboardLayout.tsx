import { Container, Stack } from "@mui/material";

import StatsAndRatingSection from "../stats-and-rating/StatsAndRatingSection";
import StatsTitle from "../stats-and-rating/StatsTitle";
import WelcomeAndStatusSection from "../welcome-and-status/WelcomeAndStatusSection";

export default function DashboardLayout() {
  return (
    <>
      <Container
        component="main"
        maxWidth="md"
        sx={{ display: { xs: "none", sm: "block" }, mt: 4 }}
      >
        <WelcomeAndStatusSection />
        <StatsTitle />
        <StatsAndRatingSection />
      </Container>

      <Stack
        component="main"
        spacing={2}
        sx={{ display: { xs: "block", sm: "none" }, mt: 3, p: 2 }}
      >
        <WelcomeAndStatusSection />
        <StatsTitle />
        <StatsAndRatingSection />
      </Stack>
    </>
  );
}

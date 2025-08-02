import { Stack } from "@mui/material";

import MobilePartnerDashboardStats from "../mobile/MobilePartnerDashboardStats";
import MobilePartnerDashboardWelcomeAndStatus from "../mobile/MobilePartnerDashboardWelcomeAndStatus";
import PartnerDashboardRatingDisplayCard from "../stats-and-rating/rating/PartnerDashboardRatingDisplayCard";

export default function MobileDashboardLayout() {
  return (
    <Stack
      component="main"
      spacing={4}
      sx={{ display: { xs: "block", md: "none" }, mt: 2, p: 2 }}
    >
      <MobilePartnerDashboardWelcomeAndStatus />
      <MobilePartnerDashboardStats />
      <PartnerDashboardRatingDisplayCard />
    </Stack>
  );
}

import { Stack } from "@mui/material";

import PartnerRatingDisplayCard from "../../common/PartnerRatingDisplayCard";
import MobilePartnerDashboardStats from "../mobile/MobilePartnerDashboardStats";
import MobilePartnerDashboardWelcomeAndStatus from "../mobile/MobilePartnerDashboardWelcomeAndStatus";

export default function MobileDashboardLayout() {
  return (
    <Stack
      component="main"
      spacing={4}
      sx={{ display: { xs: "block", md: "none" }, mt: 2, p: 2 }}
    >
      <MobilePartnerDashboardWelcomeAndStatus />
      <MobilePartnerDashboardStats />
      <PartnerRatingDisplayCard type="dashboard" />
    </Stack>
  );
}

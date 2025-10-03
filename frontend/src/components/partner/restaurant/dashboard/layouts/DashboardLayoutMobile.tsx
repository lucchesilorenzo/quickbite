import { Stack } from "@mui/material";

import PartnerRatingDisplayCard from "../../common/PartnerRatingDisplayCard";
import PartnerDashboardStatsMobile from "../mobile/PartnerDashboardStatsMobile";
import PartnerDashboardWelcomeAndStatusMobile from "../mobile/PartnerDashboardWelcomeAndStatusMobile";

export default function DashboardLayoutMobile() {
  return (
    <Stack
      component="main"
      spacing={2}
      sx={{ display: { xs: "block", md: "none" }, mt: 3, p: 2 }}
    >
      <PartnerDashboardWelcomeAndStatusMobile />
      <PartnerDashboardStatsMobile />
      <PartnerRatingDisplayCard type="dashboard" />
    </Stack>
  );
}

import { Stack } from "@mui/material";

import PartnerDashboardRestaurantStatus from "../welcome-and-status/PartnerDashboardRestaurantStatus";
import PartnerDashboardWelcome from "../welcome-and-status/PartnerDashboardWelcome";

export default function PartnerDashboardWelcomeAndStatusMobile() {
  return (
    <Stack component="section" spacing={2}>
      <PartnerDashboardWelcome />
      <PartnerDashboardRestaurantStatus />
    </Stack>
  );
}

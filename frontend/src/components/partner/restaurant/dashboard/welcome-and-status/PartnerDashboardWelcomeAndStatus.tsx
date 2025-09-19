import { Stack } from "@mui/material";

import PartnerDashboardRestaurantStatus from "./PartnerDashboardRestaurantStatus";
import PartnerDashboardWelcome from "./PartnerDashboardWelcome";

export default function PartnerDashboardWelcomeAndStatus() {
  return (
    <Stack
      component="section"
      direction="row"
      sx={{ justifyContent: "space-between", alignItems: "center", mb: 3 }}
    >
      <PartnerDashboardWelcome />
      <PartnerDashboardRestaurantStatus />
    </Stack>
  );
}

import { Stack } from "@mui/material";

import PartnerDashboardRestaurantStatus from "../PartnerDashboardRestaurantStatus";
import PartnerDashboardWelcome from "../PartnerDashboardWelcome";

export default function PartnerDashboardHeader() {
  return (
    <Stack
      direction="row"
      sx={{ justifyContent: "space-between", alignItems: "center", mb: 4 }}
    >
      <PartnerDashboardWelcome />
      <PartnerDashboardRestaurantStatus />
    </Stack>
  );
}

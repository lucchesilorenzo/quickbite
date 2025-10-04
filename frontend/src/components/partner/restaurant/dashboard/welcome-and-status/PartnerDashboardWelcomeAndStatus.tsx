import { Stack } from "@mui/material";

import PartnerDashboardRestaurantApproval from "./PartnerDashboardRestaurantApproval";
import PartnerDashboardRestaurantStatus from "./PartnerDashboardRestaurantStatus";
import PartnerDashboardWelcome from "./PartnerDashboardWelcome";

import { usePartnerRestaurant } from "@/hooks/contexts/private/partner/usePartnerRestaurant";

export default function PartnerDashboardWelcomeAndStatus() {
  const { restaurant } = usePartnerRestaurant();

  return (
    <Stack
      component="section"
      direction={{ xs: "column", sm: "row" }}
      spacing={{ xs: 2, sm: 0 }}
      sx={{
        justifyContent: { sm: "space-between" },
        alignItems: { sm: "center" },
        mb: { sm: 3 },
      }}
    >
      <PartnerDashboardWelcome />

      <Stack spacing={2} sx={{ alignItems: { sm: "center" } }}>
        <PartnerDashboardRestaurantStatus />
        {!restaurant.is_approved && <PartnerDashboardRestaurantApproval />}
      </Stack>
    </Stack>
  );
}

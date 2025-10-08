import { Stack } from "@mui/material";

import DashboardRestaurantApproval from "./DashboardRestaurantApproval";
import DashboardRestaurantStatus from "./DashboardRestaurantStatus";
import DashboardWelcome from "./DashboardWelcome";

import { usePartnerRestaurant } from "@/hooks/contexts/private/partner/usePartnerRestaurant";

export default function DashboardWelcomeAndStatus() {
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
      <DashboardWelcome />

      <Stack spacing={2} sx={{ alignItems: { sm: "center" } }}>
        <DashboardRestaurantStatus />
        {!restaurant.is_approved && <DashboardRestaurantApproval />}
      </Stack>
    </Stack>
  );
}

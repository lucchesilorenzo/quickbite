import { Stack } from "@mui/material";

import RestaurantApprovalButton from "./RestaurantApprovalButton";
import RestaurantStatusSwitch from "./RestaurantStatusSwitch";
import RestaurantWelcome from "./RestaurantWelcome";

import { usePartnerRestaurant } from "@/features/private/partner/contexts/PartnerRestaurantProvider";

export default function WelcomeAndStatusSection() {
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
      <RestaurantWelcome />

      <Stack spacing={2} sx={{ alignItems: { sm: "center" } }}>
        <RestaurantStatusSwitch />
        {!restaurant.is_approved && <RestaurantApprovalButton />}
      </Stack>
    </Stack>
  );
}

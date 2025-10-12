import { Button } from "@mui/material";

import { usePartnerRestaurant } from "@/features/private/partner/contexts/PartnerRestaurantProvider";
import { useUpdateRestaurantApprovedStatus } from "@/features/private/partner/hooks/restaurants/restaurant/useUpdateRestaurantApprovedStatus";

export default function RestaurantApprovalButton() {
  const { restaurant } = usePartnerRestaurant();

  const { mutateAsync: updateRestaurantApprovedStatus, isPending: isUpdating } =
    useUpdateRestaurantApprovedStatus(restaurant.id);

  async function handleRestaurantApproval() {
    await updateRestaurantApprovedStatus();
  }

  return (
    <Button
      variant="outlined"
      disabled={isUpdating}
      loading={isUpdating}
      loadingIndicator="Checking..."
      onClick={handleRestaurantApproval}
    >
      Approve restaurant
    </Button>
  );
}

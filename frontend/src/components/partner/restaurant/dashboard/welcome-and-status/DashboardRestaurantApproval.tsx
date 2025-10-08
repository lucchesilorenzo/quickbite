import { Button } from "@mui/material";

import { usePartnerRestaurant } from "@/hooks/contexts/private/partner/usePartnerRestaurant";
import { useUpdatePartnerRestaurantApprovedStatus } from "@/hooks/react-query/private/partner/restaurants/restaurant/useUpdatePartnerRestaurantApprovedStatus";

export default function DashboardRestaurantApproval() {
  const { restaurant } = usePartnerRestaurant();

  const {
    mutateAsync: updatePartnerRestaurantApprovedStatus,
    isPending: isUpdating,
  } = useUpdatePartnerRestaurantApprovedStatus(restaurant.id);

  async function handleApproveRestaurant() {
    await updatePartnerRestaurantApprovedStatus();
  }

  return (
    <Button
      variant="outlined"
      disabled={isUpdating}
      loading={isUpdating}
      loadingIndicator="Checking..."
      onClick={handleApproveRestaurant}
    >
      Approve restaurant
    </Button>
  );
}

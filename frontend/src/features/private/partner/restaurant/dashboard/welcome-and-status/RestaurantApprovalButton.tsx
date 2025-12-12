import { Button } from "@mui/material";
import { useRestaurant } from "@partner/contexts/RestaurantProvider";
import { useUpdateRestaurantApprovedStatus } from "@partner/hooks/restaurants/restaurant/useUpdateRestaurantApprovedStatus";

export default function RestaurantApprovalButton() {
  const { restaurantData } = useRestaurant();

  const { mutate: updateRestaurantApprovedStatus, isPending: isUpdating } =
    useUpdateRestaurantApprovedStatus({
      restaurantId: restaurantData.restaurant.id,
    });

  function handleRestaurantApproval() {
    updateRestaurantApprovedStatus();
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

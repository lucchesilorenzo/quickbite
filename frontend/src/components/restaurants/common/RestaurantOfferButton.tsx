import { Button } from "@mui/material";
import { yellow } from "@mui/material/colors";

import { useSingleRestaurant } from "@/hooks/contexts/useSingleRestaurant";
import { formatCurrency } from "@/lib/utils";

export default function RestaurantOfferButton() {
  const { restaurant, setOpenRestaurantAboutDialog, setTabToOpen } =
    useSingleRestaurant();

  function handleOpenAboutDialogAndOffersTab() {
    setOpenRestaurantAboutDialog(true);
    setTabToOpen("offers");
  }

  return (
    <Button
      variant="contained"
      color="inherit"
      size="large"
      sx={{
        bgcolor: yellow[700],
        borderRadius: 3,
        fontWeight: 700,
        textTransform: "none",
      }}
      disableElevation
      onClick={handleOpenAboutDialogAndOffersTab}
    >
      {restaurant.discount * 100}% off when you spend{" "}
      {formatCurrency(restaurant.min_discount_amount)} or more
    </Button>
  );
}

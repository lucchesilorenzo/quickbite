import { Button } from "@mui/material";
import { yellow } from "@mui/material/colors";

import { useRestaurant } from "@/contexts/RestaurantProvider";
import { formatCurrency } from "@/lib/utils/formatting";
import { Offer } from "@/types/offer.types";

type RestaurantOfferButtonProps = {
  offer: Offer;
};

export default function RestaurantOfferButton({
  offer,
}: RestaurantOfferButtonProps) {
  const { setOpenRestaurantAboutDialog, setTabToOpen } = useRestaurant();

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
      fullWidth
    >
      {offer.discount_rate * 100}% off when you spend{" "}
      {formatCurrency(offer.min_discount_amount)} or more
    </Button>
  );
}

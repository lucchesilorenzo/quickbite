import { Button } from "@mui/material";
import { yellow } from "@mui/material/colors";

import { useSingleRestaurant } from "@/hooks/contexts/public/useSingleRestaurant";
import { formatCurrency } from "@/lib/utils";
import { Offer } from "@/types";

type RestaurantOfferButtonProps = {
  offer: Offer;
};

export default function RestaurantOfferButton({
  offer,
}: RestaurantOfferButtonProps) {
  const { setOpenRestaurantAboutDialog, setTabToOpen } = useSingleRestaurant();

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

import { useState } from "react";

import { Button } from "@mui/material";
import { yellow } from "@mui/material/colors";

import PartnerSettingsPromotionsEditPromotionDialog from "./PartnerSettingsPromotionsEditPromotionDialog";

import { formatCurrency } from "@/lib/utils";
import { RestaurantDetail } from "@/types";

type PartnerSettingsPromotionsOffersItemProps = {
  offer: RestaurantDetail["offers"][number];
};

export default function PartnerSettingsPromotionsOffersItem({
  offer,
}: PartnerSettingsPromotionsOffersItemProps) {
  const [openEditPromotionDialog, setOpenEditPromotionDialog] = useState(false);

  return (
    <>
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
        onClick={() => setOpenEditPromotionDialog(true)}
        fullWidth
      >
        {offer.discount_rate * 100}% off when you spend{" "}
        {formatCurrency(offer.min_discount_amount)} or more
      </Button>

      <PartnerSettingsPromotionsEditPromotionDialog
        openEditPromotionDialog={openEditPromotionDialog}
        setOpenEditPromotionDialog={setOpenEditPromotionDialog}
      />
    </>
  );
}

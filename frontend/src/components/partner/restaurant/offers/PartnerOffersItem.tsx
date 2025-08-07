import { useState } from "react";

import { Button } from "@mui/material";
import { yellow } from "@mui/material/colors";

import PartnerOffersEditOfferDialog from "./PartnerOffersEditOfferDialog";

import { formatCurrency } from "@/lib/utils";
import { RestaurantDetail } from "@/types";

type PartnerOffersItemProps = {
  offer: RestaurantDetail["offers"][number];
};

export default function PartnerOffersItem({ offer }: PartnerOffersItemProps) {
  const [openEditOfferDialog, setOpenEditOfferDialog] = useState(false);

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
        onClick={() => setOpenEditOfferDialog(true)}
        fullWidth
      >
        {offer.discount_rate * 100}% off when you spend{" "}
        {formatCurrency(offer.min_discount_amount)} or more
      </Button>

      <PartnerOffersEditOfferDialog
        offer={offer}
        openEditOfferDialog={openEditOfferDialog}
        setOpenEditOfferDialog={setOpenEditOfferDialog}
      />
    </>
  );
}

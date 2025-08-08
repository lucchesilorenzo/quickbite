import { useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  Divider,
  IconButton,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { yellow } from "@mui/material/colors";

import PartnerOffersDeleteOfferDialog from "./PartnerOffersDeleteOfferDialog";
import PartnerOffersEditOfferDialog from "./PartnerOffersEditOfferDialog";

import { formatCurrency } from "@/lib/utils";
import { RestaurantDetail } from "@/types";

type PartnerOffersItemProps = {
  offer: RestaurantDetail["offers"][number];
  hasSibling: boolean;
};

export default function PartnerOffersItem({
  offer,
  hasSibling,
}: PartnerOffersItemProps) {
  const [openEditOfferDialog, setOpenEditOfferDialog] = useState(false);
  const [openDeleteOfferDialog, setOpenDeleteOfferDialog] = useState(false);

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
      <Button
        variant="contained"
        color="inherit"
        size="large"
        sx={{
          width: 350,
          bgcolor: yellow[700],
          borderRadius: 3,
          fontWeight: 700,
          textTransform: "none",
        }}
        disableElevation
        onClick={() => setOpenEditOfferDialog(true)}
      >
        {offer.discount_rate * 100}% off when you spend{" "}
        {formatCurrency(offer.min_discount_amount)} or more
      </Button>

      <IconButton
        aria-label="Delete offer"
        color="error"
        onClick={() => setOpenDeleteOfferDialog(true)}
      >
        <DeleteIcon />
      </IconButton>

      {!isMobile && hasSibling && <Divider orientation="vertical" flexItem />}

      <PartnerOffersEditOfferDialog
        offer={offer}
        openEditOfferDialog={openEditOfferDialog}
        setOpenEditOfferDialog={setOpenEditOfferDialog}
      />

      <PartnerOffersDeleteOfferDialog
        offer={offer}
        openDeleteOfferDialog={openDeleteOfferDialog}
        setOpenDeleteOfferDialog={setOpenDeleteOfferDialog}
      />
    </Stack>
  );
}

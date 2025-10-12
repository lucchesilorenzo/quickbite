import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { usePartnerRestaurant } from "@partner/contexts/PartnerRestaurantProvider";
import { useDeleteOffer } from "@partner/hooks/restaurants/offers/useDeleteOffer";

import { Offer } from "@/types/offer-types";

type DeleteOfferDialogProps = {
  offer: Offer;
  openDeleteOfferDialog: boolean;
  setOpenDeleteOfferDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DeleteOfferDialog({
  offer,
  openDeleteOfferDialog,
  setOpenDeleteOfferDialog,
}: DeleteOfferDialogProps) {
  const { restaurant } = usePartnerRestaurant();

  const { mutateAsync: deleteOffer, isPending: isDeleting } = useDeleteOffer(
    restaurant.id,
    offer.id,
  );

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  async function handleDeleteOffer() {
    await deleteOffer();
    setOpenDeleteOfferDialog(false);
  }

  return (
    <Dialog
      open={openDeleteOfferDialog}
      onClose={() => setOpenDeleteOfferDialog(false)}
      fullWidth={!isMobile}
      fullScreen={isMobile}
      disableRestoreFocus
    >
      <Stack spacing={2} sx={{ p: 2 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <DialogTitle sx={{ p: 0, fontWeight: 700 }}>Delete offer</DialogTitle>

          <IconButton
            color="inherit"
            aria-label="close"
            onClick={() => setOpenDeleteOfferDialog(false)}
            sx={{ p: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <DialogContent sx={{ p: 0 }}>
          Are you sure you want to delete this offer?
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDeleteOfferDialog(false)}>
            Cancel
          </Button>

          <Button
            onClick={handleDeleteOffer}
            disabled={isDeleting}
            loading={isDeleting}
            loadingIndicator="Deleting..."
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Stack>
    </Dialog>
  );
}

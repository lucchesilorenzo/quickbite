import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
} from "@mui/material";

import { usePartnerRestaurant } from "@/hooks/contexts/usePartnerRestaurant";
import { useDeletePartnerRestaurantOffer } from "@/hooks/react-query/private/partners/restaurants/useDeletePartnerRestaurantOffer";
import { RestaurantDetail } from "@/types";

type PartnerOffersDeleteOfferDialogProps = {
  offer: RestaurantDetail["offers"][number];
  openDeleteOfferDialog: boolean;
  setOpenDeleteOfferDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PartnerOffersDeleteOfferDialog({
  offer,
  openDeleteOfferDialog,
  setOpenDeleteOfferDialog,
}: PartnerOffersDeleteOfferDialogProps) {
  const { restaurant } = usePartnerRestaurant();

  const { mutateAsync: deletePartnerRestaurantOffer, isPending } =
    useDeletePartnerRestaurantOffer(restaurant.id, offer.id);

  return (
    <Dialog
      open={openDeleteOfferDialog}
      onClose={() => setOpenDeleteOfferDialog(false)}
      fullWidth
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
            onClick={async () => await deletePartnerRestaurantOffer()}
            disabled={isPending}
            loading={isPending}
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

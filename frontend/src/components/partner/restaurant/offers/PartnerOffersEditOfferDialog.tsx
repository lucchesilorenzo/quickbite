import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
} from "@mui/material";

type PartnerOffersEditOfferDialogProps = {
  openEditOfferDialog: boolean;
  setOpenEditOfferDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PartnerOffersEditOfferDialog({
  openEditOfferDialog,
  setOpenEditOfferDialog,
}: PartnerOffersEditOfferDialogProps) {
  return (
    <Dialog
      open={openEditOfferDialog}
      onClose={() => setOpenEditOfferDialog(false)}
      fullWidth
      disableRestoreFocus
    >
      <Stack spacing={2} sx={{ p: 2 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <DialogTitle sx={{ p: 0, fontWeight: 700 }}>Edit offer</DialogTitle>

          <IconButton
            color="inherit"
            aria-label="close"
            onClick={() => setOpenEditOfferDialog(false)}
            sx={{ p: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <DialogContent sx={{ p: 0 }}>Form</DialogContent>
      </Stack>
    </Dialog>
  );
}

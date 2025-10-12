import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  useMediaQuery,
} from "@mui/material";

import EditOfferForm from "./EditOfferForm";

import { Offer } from "@/types";

type EditOfferDialogProps = {
  offer: Offer;
  openEditOfferDialog: boolean;
  setOpenEditOfferDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditOfferDialog({
  offer,
  openEditOfferDialog,
  setOpenEditOfferDialog,
}: EditOfferDialogProps) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Dialog
      open={openEditOfferDialog}
      onClose={() => setOpenEditOfferDialog(false)}
      fullWidth={!isMobile}
      fullScreen={isMobile}
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

        <DialogContent sx={{ p: 1 }}>
          <EditOfferForm
            offer={offer}
            setOpenEditOfferDialog={setOpenEditOfferDialog}
          />
        </DialogContent>
      </Stack>
    </Dialog>
  );
}

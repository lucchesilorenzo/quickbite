import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  useMediaQuery,
} from "@mui/material";

import AddOfferForm from "./AddOfferForm";

type AddOfferDialogProps = {
  openAddOfferDialog: boolean;
  setOpenAddOfferDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddOfferDialog({
  openAddOfferDialog,
  setOpenAddOfferDialog,
}: AddOfferDialogProps) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Dialog
      open={openAddOfferDialog}
      onClose={() => setOpenAddOfferDialog(false)}
      fullWidth={!isMobile}
      fullScreen={isMobile}
      disableRestoreFocus
    >
      <Stack spacing={2} sx={{ p: 2 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <DialogTitle sx={{ p: 0, fontWeight: 700 }}>Add offer</DialogTitle>

          <IconButton
            color="inherit"
            aria-label="close"
            onClick={() => setOpenAddOfferDialog(false)}
            sx={{ p: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <DialogContent sx={{ p: 1 }}>
          <AddOfferForm setOpenAddOfferDialog={setOpenAddOfferDialog} />
        </DialogContent>
      </Stack>
    </Dialog>
  );
}

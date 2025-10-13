import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  useMediaQuery,
} from "@mui/material";

import AddressInfoForm from "./AddressInfoForm";

type AddressInfoDialogProps = {
  openAddressInfoDialog: boolean;
  setOpenAddressInfoDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddressInfoDialog({
  openAddressInfoDialog,
  setOpenAddressInfoDialog,
}: AddressInfoDialogProps) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Dialog
      open={openAddressInfoDialog}
      onClose={() => setOpenAddressInfoDialog(false)}
      fullWidth={!isMobile}
      fullScreen={isMobile}
      disableRestoreFocus
    >
      <Stack spacing={2} sx={{ p: 2 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <DialogTitle sx={{ p: 0, fontWeight: 700 }}>Edit address</DialogTitle>

          <IconButton
            color="inherit"
            aria-label="close"
            onClick={() => setOpenAddressInfoDialog(false)}
            sx={{ p: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <DialogContent sx={{ p: 1 }}>
          <AddressInfoForm
            setOpenAddressInfoDialog={setOpenAddressInfoDialog}
          />
        </DialogContent>
      </Stack>
    </Dialog>
  );
}

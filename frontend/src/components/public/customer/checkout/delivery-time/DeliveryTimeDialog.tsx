import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
} from "@mui/material";

import DeliveryTimeForm from "./DeliveryTimeForm";

type DeliveryTimeDialogProps = {
  openDeliveryTimeDialog: boolean;
  setOpenDeliveryTimeDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DeliveryTimeDialog({
  openDeliveryTimeDialog,
  setOpenDeliveryTimeDialog,
}: DeliveryTimeDialogProps) {
  return (
    <Dialog
      open={openDeliveryTimeDialog}
      onClose={() => setOpenDeliveryTimeDialog(false)}
      fullWidth
      disableRestoreFocus
    >
      <Stack spacing={2} sx={{ p: 2 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <DialogTitle sx={{ p: 0, fontWeight: 700 }}>
            Delivery time
          </DialogTitle>

          <IconButton
            color="inherit"
            aria-label="close"
            onClick={() => setOpenDeliveryTimeDialog(false)}
            sx={{ p: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <DialogContent sx={{ p: 1 }}>
          <DeliveryTimeForm
            setOpenDeliveryTimeDialog={setOpenDeliveryTimeDialog}
          />
        </DialogContent>
      </Stack>
    </Dialog>
  );
}

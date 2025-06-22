import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

type DeliveryFeeDialogProps = {
  openDeliveryFeeDialog: boolean;
  setOpenDeliveryFeeDialog: (openDeliveryFeeDialog: boolean) => void;
};

export default function DeliveryFeeDialog({
  openDeliveryFeeDialog,
  setOpenDeliveryFeeDialog,
}: DeliveryFeeDialogProps) {
  return (
    <Dialog
      open={openDeliveryFeeDialog}
      onClose={() => setOpenDeliveryFeeDialog(false)}
      fullWidth
      disableRestoreFocus
    >
      <Stack spacing={2} sx={{ p: 2 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <DialogTitle sx={{ p: 0, fontWeight: 700 }}>Delivery fee</DialogTitle>

          <IconButton
            color="inherit"
            aria-label="close"
            onClick={() => setOpenDeliveryFeeDialog(false)}
            sx={{ p: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <DialogContent sx={{ p: 0 }}>
          <Typography sx={{ mb: 2 }}>
            This contributes to the costs of delivery to you. It can vary
            depending on e.g. your distance from the store, selected store,
            order value and, sometimes, time of day.
          </Typography>
        </DialogContent>
      </Stack>
    </Dialog>
  );
}

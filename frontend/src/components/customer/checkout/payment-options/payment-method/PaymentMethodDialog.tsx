import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  useMediaQuery,
} from "@mui/material";

import PaymentMethodForm from "./PaymentMethodForm";

type PaymentMethodDialogProps = {
  openPaymentMethodDialog: boolean;
  setOpenPaymentMethodDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PaymentMethodDialog({
  openPaymentMethodDialog,
  setOpenPaymentMethodDialog,
}: PaymentMethodDialogProps) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Dialog
      open={openPaymentMethodDialog}
      onClose={() => setOpenPaymentMethodDialog(false)}
      fullWidth={!isMobile}
      fullScreen={isMobile}
      disableRestoreFocus
    >
      <Stack spacing={2} sx={{ p: 2 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <DialogTitle sx={{ p: 0, fontWeight: 700 }}>
            Choose payment method
          </DialogTitle>

          <IconButton
            color="inherit"
            aria-label="close"
            onClick={() => setOpenPaymentMethodDialog(false)}
            sx={{ p: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <DialogContent sx={{ p: 0 }}>
          <PaymentMethodForm
            setOpenPaymentMethodDialog={setOpenPaymentMethodDialog}
          />
        </DialogContent>
      </Stack>
    </Dialog>
  );
}

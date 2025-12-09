import { useCheckout } from "@customer/contexts/CheckoutProvider";
import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
} from "@mui/material";

import DeliveryTimeForm from "./DeliveryTimeForm";

import Spinner from "@/components/common/Spinner";

type DeliveryTimeDialogProps = {
  openDeliveryTimeDialog: boolean;
  setOpenDeliveryTimeDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DeliveryTimeDialog({
  openDeliveryTimeDialog,
  setOpenDeliveryTimeDialog,
}: DeliveryTimeDialogProps) {
  const { isLoadingDeliverySlots, deliverySlotsError } = useCheckout();

  return (
    <Dialog
      open={openDeliveryTimeDialog}
      onClose={() => setOpenDeliveryTimeDialog(false)}
      fullWidth
      disableRestoreFocus
    >
      <Stack spacing={2}>
        <Stack direction="row" sx={{ justifyContent: "space-between", p: 2 }}>
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

        <DialogContent sx={{ p: 0 }}>
          {isLoadingDeliverySlots && <Spinner />}

          {!isLoadingDeliverySlots && deliverySlotsError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {deliverySlotsError.message}
            </Alert>
          )}

          {!isLoadingDeliverySlots && !deliverySlotsError && (
            <DeliveryTimeForm
              setOpenDeliveryTimeDialog={setOpenDeliveryTimeDialog}
            />
          )}
        </DialogContent>
      </Stack>
    </Dialog>
  );
}

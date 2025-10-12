import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
} from "@mui/material";

import DeliveryTimeForm from "./DeliveryTimeForm";

import Spinner from "@/components/common/Spinner";
import { useCheckout } from "@/contexts/private/customer/CheckoutProvider";

type DeliveryTimeDialogProps = {
  openDeliveryTimeDialog: boolean;
  setOpenDeliveryTimeDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DeliveryTimeDialog({
  openDeliveryTimeDialog,
  setOpenDeliveryTimeDialog,
}: DeliveryTimeDialogProps) {
  const { isLoadingDeliverySlots } = useCheckout();

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
          {!isLoadingDeliverySlots ? (
            <DeliveryTimeForm
              setOpenDeliveryTimeDialog={setOpenDeliveryTimeDialog}
            />
          ) : (
            <Spinner />
          )}
        </DialogContent>
      </Stack>
    </Dialog>
  );
}

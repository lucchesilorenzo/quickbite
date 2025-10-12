import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  useMediaQuery,
} from "@mui/material";

import ViewOrderFeesAndDiscounts from "@/components/view-order-dialog/ViewOrderFeesAndDiscounts";
import ViewOrderItemsList from "@/components/view-order-dialog/ViewOrderItemsList";
import ViewOrderReceipt from "@/components/view-order-dialog/ViewOrderReceipt";
import { Order } from "@/types/order-types";

type ViewOrderDialogProps = {
  order: Order;
  openViewOrderDialog: boolean;
  setOpenViewOrderDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ViewOrderDialog({
  order,
  openViewOrderDialog,
  setOpenViewOrderDialog,
}: ViewOrderDialogProps) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Dialog
      open={openViewOrderDialog}
      onClose={() => setOpenViewOrderDialog(false)}
      fullWidth={!isMobile}
      fullScreen={isMobile}
      disableRestoreFocus
    >
      <Stack spacing={2} sx={{ p: 2 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <DialogTitle sx={{ p: 0, fontWeight: 700 }}>
            Order # {order.order_code}
          </DialogTitle>

          <IconButton
            color="inherit"
            aria-label="close"
            onClick={() => setOpenViewOrderDialog(false)}
            sx={{ p: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <DialogContent sx={{ p: 0 }}>
          <ViewOrderItemsList order={order} />
          <ViewOrderFeesAndDiscounts order={order} />
        </DialogContent>

        <DialogActions sx={{ p: 0 }}>
          <ViewOrderReceipt order={order} />
        </DialogActions>
      </Stack>
    </Dialog>
  );
}

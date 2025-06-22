import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  useMediaQuery,
} from "@mui/material";

import OrderItemsHeader from "./OrderItemsHeader";
import OrderItemsList from "./OrderItemsList";

type OrderItemsDialogProps = {
  openOrderItemsDialog: boolean;
  setOpenOrderItemsDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function OrderItemsDialog({
  openOrderItemsDialog,
  setOpenOrderItemsDialog,
}: OrderItemsDialogProps) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Dialog
      open={openOrderItemsDialog}
      onClose={() => setOpenOrderItemsDialog(false)}
      fullWidth={!isMobile}
      fullScreen={isMobile}
      disableRestoreFocus
    >
      <Stack spacing={2} sx={{ p: 2 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <DialogTitle sx={{ p: 0, fontWeight: 700 }}>
            Your articles
          </DialogTitle>

          <IconButton
            color="inherit"
            aria-label="close"
            onClick={() => setOpenOrderItemsDialog(false)}
            sx={{ p: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <DialogContent sx={{ p: 0 }}>
          <OrderItemsHeader />
          <Divider sx={{ my: 2 }} />
          <OrderItemsList />
        </DialogContent>

        <DialogActions sx={{ p: 0 }}>
          <Box sx={{ width: 1, mt: 4 }}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => setOpenOrderItemsDialog(false)}
            >
              Done
            </Button>
          </Box>
        </DialogActions>
      </Stack>
    </Dialog>
  );
}

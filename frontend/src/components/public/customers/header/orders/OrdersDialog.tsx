import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  useMediaQuery,
} from "@mui/material";

import EmptyOrders from "./EmptyOrders";

type OrdersDialogProps = {
  openOrdersDialog: boolean;
  setOpenOrdersDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenHeaderCustomerDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function OrdersDialog({
  openOrdersDialog,
  setOpenOrdersDialog,
  setOpenHeaderCustomerDialog,
}: OrdersDialogProps) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Dialog
      open={openOrdersDialog}
      onClose={() => {
        setOpenHeaderCustomerDialog(false);
        setOpenOrdersDialog(false);
      }}
      fullWidth={!isMobile}
      fullScreen={isMobile}
      disableRestoreFocus
    >
      <Stack spacing={2} sx={{ p: 4 }}>
        <Stack direction="row" spacing={2}>
          <IconButton
            color="inherit"
            aria-label="close"
            onClick={() => {
              setOpenHeaderCustomerDialog(true);
              setOpenOrdersDialog(false);
            }}
            sx={{ p: 0 }}
          >
            <ArrowBackIosIcon />
          </IconButton>

          <DialogTitle
            component="h3"
            variant={isMobile ? "h6" : "h5"}
            sx={{ p: 0, fontWeight: 700 }}
          >
            Orders
          </DialogTitle>
        </Stack>

        <DialogContent sx={{ p: 1 }}>
          <EmptyOrders
            setOpenHeaderCustomerDialog={setOpenHeaderCustomerDialog}
            setOpenOrdersDialog={setOpenOrdersDialog}
          />
        </DialogContent>
      </Stack>
    </Dialog>
  );
}

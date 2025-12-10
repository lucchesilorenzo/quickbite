import { useState } from "react";

import { useGetOrders } from "@customer/hooks/orders/useGetOrders";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  Alert,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { ordersDefaults } from "@private/shared/lib/query-defaults";
import { useSearchParams } from "react-router-dom";

import EmptyOrders from "./EmptyOrders";
import OrdersList from "./OrdersList";

import Spinner from "@/components/common/Spinner";

type OrdersDialogProps = {
  openOrdersDialog: boolean;
};

export default function OrdersDialog({ openOrdersDialog }: OrdersDialogProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);

  const {
    data: ordersData = { success: false, message: "", orders: ordersDefaults },
    isLoading: isLoadingOrders,
    error: ordersError,
  } = useGetOrders({ page });

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  function handleCloseDialog() {
    setSearchParams(
      { ...Object.fromEntries(searchParams), dialog: "main", orders_page: [] },
      { replace: true },
    );
  }

  function handleGoBack() {
    setSearchParams(
      { ...Object.fromEntries(searchParams), dialog: "main", orders_page: [] },
      { replace: true },
    );
  }

  return (
    <Dialog
      open={openOrdersDialog}
      onClose={handleCloseDialog}
      fullWidth={!isMobile}
      fullScreen={isMobile}
      disableRestoreFocus
    >
      <Stack direction="row" spacing={2} sx={{ p: 2 }}>
        <IconButton
          color="inherit"
          aria-label="close"
          onClick={handleGoBack}
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

      <DialogContent sx={{ p: 0 }}>
        {isLoadingOrders && <Spinner />}

        {!isLoadingOrders && ordersError && (
          <Alert severity="error">{ordersError.message}</Alert>
        )}

        {!isLoadingOrders &&
          !ordersError &&
          ordersData.orders.data.length === 0 && <EmptyOrders />}

        {!isLoadingOrders &&
          !ordersError &&
          ordersData.orders.data.length > 0 && (
            <OrdersList
              orders={ordersData.orders.data}
              totalPages={ordersData.orders.last_page}
              page={page}
              setPage={setPage}
            />
          )}
      </DialogContent>
    </Dialog>
  );
}

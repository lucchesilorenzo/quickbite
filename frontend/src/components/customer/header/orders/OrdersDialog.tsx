import { useState } from "react";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";

import EmptyOrders from "./EmptyOrders";
import OrdersList from "./OrdersList";

import Spinner from "@/components/common/Spinner";
import { useGetCustomerOrders } from "@/hooks/react-query/private/customers/orders/useGetCustomerOrders";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);

  const { data: ordersWithPagination, isLoading: isLoadingOrders } =
    useGetCustomerOrders(page);

  const orders = ordersWithPagination?.data || [];
  const totalPages = ordersWithPagination?.last_page || 1;

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  function handleCloseDialog() {
    setSearchParams(
      {
        ...Object.fromEntries(searchParams),
        dialog: [],
        ordersPage: [],
      },
      {
        replace: true,
      },
    );
    setOpenHeaderCustomerDialog(false);
    setOpenOrdersDialog(false);
  }

  function handleGoBack() {
    setSearchParams(
      {
        ...Object.fromEntries(searchParams),
        dialog: [],
        ordersPage: [],
      },
      {
        replace: true,
      },
    );
    setOpenHeaderCustomerDialog(true);
    setOpenOrdersDialog(false);
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
        {isLoadingOrders ? (
          <Spinner />
        ) : !orders.length ? (
          <EmptyOrders
            setOpenHeaderCustomerDialog={setOpenHeaderCustomerDialog}
            setOpenOrdersDialog={setOpenOrdersDialog}
          />
        ) : (
          <OrdersList
            orders={orders}
            totalPages={totalPages}
            page={page}
            setPage={setPage}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

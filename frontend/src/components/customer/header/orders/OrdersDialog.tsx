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
import { customerOrdersDefaults } from "@/lib/query-defaults";

type OrdersDialogProps = {
  openOrdersDialog: boolean;
};

export default function OrdersDialog({ openOrdersDialog }: OrdersDialogProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);

  const {
    data: ordersWithPagination = customerOrdersDefaults,
    isLoading: isLoadingOrders,
  } = useGetCustomerOrders(page);

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  function handleCloseDialog() {
    setSearchParams(
      { ...Object.fromEntries(searchParams), dialog: "main", ordersPage: [] },
      { replace: true },
    );
  }

  function handleGoBack() {
    setSearchParams(
      { ...Object.fromEntries(searchParams), dialog: "main", ordersPage: [] },
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
        {isLoadingOrders ? (
          <Spinner />
        ) : !ordersWithPagination.data.length ? (
          <EmptyOrders />
        ) : (
          <OrdersList
            orders={ordersWithPagination.data}
            totalPages={ordersWithPagination.last_page}
            page={page}
            setPage={setPage}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

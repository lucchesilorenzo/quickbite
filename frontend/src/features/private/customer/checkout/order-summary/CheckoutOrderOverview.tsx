import { useState } from "react";

import { useCheckout } from "@customer/contexts/CheckoutProvider";
import { Box, Stack, Typography } from "@mui/material";

import OrderItemsDialog from "./OrderItemsDialog";

import env from "@/lib/env";

export default function CheckoutOrderOverview() {
  const { cartData } = useCheckout();

  const [openOrderItemsDialog, setOpenOrderItemsDialog] = useState(false);

  return (
    <Stack
      direction="row"
      sx={{ alignItems: "center", justifyContent: "space-between" }}
    >
      <Box>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {cartData.cart.restaurant.name}
        </Typography>

        <Typography
          role="button"
          variant="body1"
          sx={{
            cursor: "pointer",
            textDecoration: "underline",
            "&:hover": { textDecoration: "none" },
          }}
          onClick={() => setOpenOrderItemsDialog(true)}
        >
          Show {cartData.cart.total_items} articles
        </Typography>
      </Box>

      <Box
        component="img"
        src={`${env.VITE_BASE_URL}${cartData.cart.restaurant.logo}`}
        alt={cartData.cart.restaurant.name}
        sx={{
          objectFit: "cover",
          width: 50,
          height: 50,
          border: "2px solid #fff",
          borderRadius: 2,
        }}
      />

      <OrderItemsDialog
        openOrderItemsDialog={openOrderItemsDialog}
        setOpenOrderItemsDialog={setOpenOrderItemsDialog}
      />
    </Stack>
  );
}

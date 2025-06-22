import { useState } from "react";

import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";

import DeliveryFeeDialog from "./DeliveryFeeDialog";

import { useCheckout } from "@/hooks/contexts/useCheckout";
import { formatCurrency } from "@/lib/utils";

export default function CheckoutOrderFooter() {
  const { cart } = useCheckout();

  const [openDeliveryFeeDialog, setOpenDeliveryFeeDialog] = useState(false);

  const restaurantCart = Object.values(cart)[0];

  const total =
    restaurantCart.cart_total + restaurantCart.restaurant.shipping_cost;

  return (
    <Box>
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          Subtotal
        </Typography>

        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {formatCurrency(restaurantCart.cart_total)}
        </Typography>
      </Stack>

      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <Stack direction="row" sx={{ alignItems: "center" }}>
          <Typography variant="body2">Delivery fee</Typography>

          <IconButton
            color="inherit"
            size="small"
            onClick={() => setOpenDeliveryFeeDialog(true)}
          >
            <InfoOutlineIcon fontSize="inherit" color="inherit" />
          </IconButton>
        </Stack>

        <Typography variant="body2">
          {formatCurrency(restaurantCart.restaurant.shipping_cost)}
        </Typography>
      </Stack>

      <Divider sx={{ my: 2 }} />

      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <Typography variant="body1" sx={{ fontWeight: 600 }}>
          Total
        </Typography>

        <Typography variant="body1" sx={{ fontWeight: 600 }}>
          {formatCurrency(total)}
        </Typography>
      </Stack>

      <DeliveryFeeDialog
        openDeliveryFeeDialog={openDeliveryFeeDialog}
        setOpenDeliveryFeeDialog={setOpenDeliveryFeeDialog}
      />
    </Box>
  );
}

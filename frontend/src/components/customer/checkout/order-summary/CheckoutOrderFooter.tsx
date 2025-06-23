import { useState } from "react";

import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

import DeliveryFeeDialog from "./DeliveryFeeDialog";

import { useCheckout } from "@/hooks/contexts/useCheckout";
import { formatCurrency } from "@/lib/utils";

export default function CheckoutOrderFooter() {
  const { cart, handleCheckout } = useCheckout();

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

      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={handleCheckout}
        >
          Order and pay
        </Button>

        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ mt: 2, textAlign: "justify" }}
        >
          By clicking on "Order and pay" you confirm the content of the cart,
          the data you have filled in, accepting{" "}
          <Typography
            component={Link}
            to="/privacy-policy"
            variant="body2"
            color="textPrimary"
            sx={{
              cursor: "pointer",
              textDecoration: "underline",
              mr: 0.5,
              "&:hover": { textDecoration: "none" },
            }}
          >
            the privacy policy
          </Typography>
          and
          <Typography
            component={Link}
            to="/terms-and-conditions"
            variant="body2"
            color="textPrimary"
            sx={{
              cursor: "pointer",
              textDecoration: "underline",
              ml: 0.5,
              "&:hover": { textDecoration: "none" },
            }}
          >
            terms of use
          </Typography>
          .
        </Typography>
      </Box>

      <DeliveryFeeDialog
        openDeliveryFeeDialog={openDeliveryFeeDialog}
        setOpenDeliveryFeeDialog={setOpenDeliveryFeeDialog}
      />
    </Box>
  );
}

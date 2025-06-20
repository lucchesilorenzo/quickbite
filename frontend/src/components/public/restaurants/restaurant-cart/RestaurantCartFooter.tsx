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
import { useNotifications } from "@toolpad/core/useNotifications";
import { useNavigate } from "react-router-dom";

import RestaurantCartDeliveryFeeDialog from "./RestaurantCartDeliveryFeeDialog";

import { useMultiCart } from "@/hooks/contexts/useMultiCart";
import { useSingleRestaurant } from "@/hooks/contexts/useSingleRestaurant";
import { useCreateOrUpdateCart } from "@/hooks/react-query/private/cart/useCreateOrUpdateCart";
import { formatCurrency } from "@/lib/utils";

export default function RestaurantCartFooter() {
  const { restaurant } = useSingleRestaurant();
  const { getCart, cartTotal } = useMultiCart();

  const { mutateAsync: createOrUpdateCart } = useCreateOrUpdateCart();

  const [openDeliveryFeeDialog, setOpenDeliveryFeeDialog] = useState(false);

  const subtotal = cartTotal(restaurant.id);
  const total = subtotal + restaurant.shipping_cost;

  const navigate = useNavigate();
  const notifications = useNotifications();

  async function handleCheckout() {
    const cart = getCart(restaurant.id);

    if (!cart) {
      notifications.show("Failed to retrieve cart.", {
        key: "retrieve-cart-error",
        severity: "error",
      });

      return;
    }

    const { cart: updatedCart } = await createOrUpdateCart(cart);
    navigate(`/checkout/${updatedCart.id}`);
  }

  return (
    <Box component="section" sx={{ p: 2, mt: "auto" }}>
      <Stack
        direction="row"
        sx={{ alignItems: "center", justifyContent: "space-between" }}
      >
        <Typography variant="body2" component="div">
          Subtotal
        </Typography>

        <Typography variant="body2" component="div">
          {formatCurrency(subtotal)}
        </Typography>
      </Stack>

      <Stack
        direction="row"
        sx={{ alignItems: "center", justifyContent: "space-between" }}
      >
        <Stack direction="row" sx={{ alignItems: "center" }}>
          <Typography variant="body2" component="div">
            Delivery fee
          </Typography>

          <IconButton
            color="inherit"
            onClick={() => setOpenDeliveryFeeDialog(true)}
            size="small"
            sx={{ "&:hover": { bgcolor: "transparent" } }}
          >
            <InfoOutlineIcon fontSize="inherit" />
          </IconButton>
        </Stack>

        <Typography variant="body2" component="div">
          {formatCurrency(restaurant.shipping_cost)}
        </Typography>
      </Stack>

      <Divider sx={{ my: 1 }} />

      <Stack
        direction="row"
        sx={{ alignItems: "center", justifyContent: "space-between" }}
      >
        <Typography variant="body2" component="div" sx={{ fontWeight: 700 }}>
          Total
        </Typography>

        <Typography variant="body2" component="div" sx={{ fontWeight: 700 }}>
          {formatCurrency(total)}
        </Typography>
      </Stack>

      <Box sx={{ mt: 2 }}>
        <Button
          onClick={handleCheckout}
          variant="contained"
          size="large"
          fullWidth
          sx={{ fontWeight: 700 }}
          disabled={subtotal < restaurant.min_amount}
        >
          Checkout ({formatCurrency(total)})
        </Button>
      </Box>

      <RestaurantCartDeliveryFeeDialog
        openDeliveryFeeDialog={openDeliveryFeeDialog}
        setOpenDeliveryFeeDialog={setOpenDeliveryFeeDialog}
      />
    </Box>
  );
}

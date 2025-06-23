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
import { Link } from "react-router-dom";

import DeliveryFeeDialog from "./DeliveryFeeDialog";

import { useCheckout } from "@/hooks/contexts/useCheckout";
import { useCreateOrder } from "@/hooks/react-query/private/orders/useCreateOrder";
import { formatCurrency } from "@/lib/utils";
import { CreateOrder } from "@/types/order-types";

export default function CheckoutOrderFooter() {
  const { cart, checkoutData, restaurantId } = useCheckout();
  const { mutateAsync: createOrder } = useCreateOrder(restaurantId);

  const [openDeliveryFeeDialog, setOpenDeliveryFeeDialog] = useState(false);
  const notifications = useNotifications();

  const restaurantCart = Object.values(cart)[0];

  const total =
    restaurantCart.cart_total + restaurantCart.restaurant.shipping_cost;

  async function handleCheckout() {
    const isPersonalInfoValid =
      checkoutData[restaurantId].personal_info &&
      checkoutData[restaurantId].personal_info.first_name.trim() &&
      checkoutData[restaurantId].personal_info.last_name.trim() &&
      checkoutData[restaurantId].personal_info.phone_number.trim();

    const isAddressValid =
      checkoutData[restaurantId].address_info &&
      checkoutData[restaurantId].address_info.street_address.trim() &&
      checkoutData[restaurantId].address_info.building_number.trim() &&
      checkoutData[restaurantId].address_info.postcode.trim() &&
      checkoutData[restaurantId].address_info.city.trim();

    if (
      !isPersonalInfoValid ||
      !isAddressValid ||
      !checkoutData[restaurantId].delivery_time ||
      !checkoutData[restaurantId].payment_method
    ) {
      notifications.show("Please fill in all the required fields.", {
        key: "checkout-error",
        severity: "error",
      });

      return;
    }

    const order: CreateOrder = {
      ...checkoutData[restaurantId].personal_info,
      ...checkoutData[restaurantId].address_info,
      ...checkoutData[restaurantId].delivery_time,
      ...checkoutData[restaurantId].order_notes,
      ...checkoutData[restaurantId].payment_method,
      restaurant_id: restaurantCart.restaurant_id,
      order_items: restaurantCart.items.map((i) => ({
        menu_item_id: i.id,
        quantity: i.quantity,
        item_total: i.item_total,
      })),
    };

    await createOrder(order);
  }

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

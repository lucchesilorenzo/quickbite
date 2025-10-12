import { useState } from "react";

import { useCheckout } from "@customer/contexts/CheckoutProvider";
import { useDeleteCart } from "@customer/hooks/carts/useDeleteCart";
import { useCreateOrder } from "@customer/hooks/orders/useCreateOrder";
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
import { Link, useNavigate } from "react-router-dom";

import DeliveryFeeDialog from "./DeliveryFeeDialog";

import ServiceFeeDialog from "@/components/ServiceFeeDialog";
import { formatCurrency } from "@/lib/utils/formatting";
import { getBestRestaurantOfferGivenSubtotal } from "@/lib/utils/restaurants";
import { CreateOrder } from "@/types/order-types";

export default function CheckoutOrderFooter() {
  const { cart, checkoutData, restaurantId, offersData } = useCheckout();

  const { mutateAsync: createOrder } = useCreateOrder(restaurantId);
  const { mutateAsync: deleteCart } = useDeleteCart(cart.id);

  const [openDeliveryFeeDialog, setOpenDeliveryFeeDialog] = useState(false);
  const [openServiceFeeDialog, setOpenServiceFeeDialog] = useState(false);

  const notifications = useNotifications();
  const navigate = useNavigate();

  const bestOffer = getBestRestaurantOfferGivenSubtotal(
    offersData.data,
    cart.cart_total,
  );

  const isDeliveryFeeFree = cart.restaurant.delivery_fee === 0;

  const discount = cart.cart_total * (bestOffer?.discount_rate || 0);

  const total =
    cart.cart_total +
    cart.restaurant.delivery_fee +
    cart.restaurant.service_fee -
    discount;

  async function handleOrderCheckout() {
    const restaurantCheckoutData = checkoutData[restaurantId];

    const isPersonalInfoValid =
      restaurantCheckoutData.personal_info &&
      restaurantCheckoutData.personal_info.first_name.trim() &&
      restaurantCheckoutData.personal_info.last_name.trim() &&
      restaurantCheckoutData.personal_info.phone_number.trim();

    const isAddressValid =
      restaurantCheckoutData.address_info &&
      restaurantCheckoutData.address_info.street_address.trim() &&
      restaurantCheckoutData.address_info.building_number.trim() &&
      restaurantCheckoutData.address_info.postcode.trim() &&
      restaurantCheckoutData.address_info.city.trim() &&
      restaurantCheckoutData.address_info.state.trim();

    if (
      !isPersonalInfoValid ||
      !isAddressValid ||
      !restaurantCheckoutData.delivery_time ||
      !restaurantCheckoutData.payment_method
    ) {
      notifications.show("Please fill in all the required fields.", {
        key: "checkout-error",
        severity: "error",
      });

      return;
    }

    const order = {
      ...restaurantCheckoutData.personal_info,
      ...restaurantCheckoutData.address_info,
      payment_method: restaurantCheckoutData.payment_method,
      delivery_time:
        restaurantCheckoutData.delivery_time.type === "asap"
          ? restaurantCheckoutData.delivery_time.type
          : restaurantCheckoutData.delivery_time.value,
      notes: restaurantCheckoutData.notes,
      restaurant_id: cart.restaurant.id,
      order_items: cart.items.map((i) => ({
        menu_item_id: i.id,
        name: i.name,
        quantity: i.quantity,
        item_total: i.item_total,
      })),
      subtotal: cart.cart_total,
      delivery_fee: cart.restaurant.delivery_fee,
      service_fee: cart.restaurant.service_fee,
      discount_rate: bestOffer?.discount_rate || 0,
      discount,
      total,
    } satisfies CreateOrder;

    const { order: newOrder } = await createOrder(order);
    await deleteCart();

    navigate(`/checkout/${newOrder.id}/success`, { replace: true });
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
          {formatCurrency(cart.cart_total)}
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
            sx={{ "&:hover": { bgcolor: "transparent" } }}
            onClick={() => setOpenDeliveryFeeDialog(true)}
          >
            <InfoOutlineIcon fontSize="inherit" color="inherit" />
          </IconButton>
        </Stack>

        <Typography variant="body2">
          {!isDeliveryFeeFree
            ? formatCurrency(cart.restaurant.delivery_fee)
            : "Free"}
        </Typography>
      </Stack>

      {cart.restaurant.service_fee > 0 && (
        <Stack
          direction="row"
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Stack direction="row" sx={{ alignItems: "center" }}>
            <Typography variant="body2" component="div">
              Service fee
            </Typography>

            <IconButton
              color="inherit"
              size="small"
              sx={{ "&:hover": { bgcolor: "transparent" } }}
              onClick={() => setOpenServiceFeeDialog(true)}
            >
              <InfoOutlineIcon fontSize="inherit" />
            </IconButton>
          </Stack>

          <Typography variant="body2" component="div">
            {formatCurrency(cart.restaurant.service_fee)}
          </Typography>
        </Stack>
      )}

      {bestOffer && (
        <Stack
          direction="row"
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Typography variant="body2" component="div">
            {bestOffer.discount_rate * 100}% off
          </Typography>

          <Typography variant="body2" component="div">
            -{formatCurrency(discount)}
          </Typography>
        </Stack>
      )}

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
          onClick={handleOrderCheckout}
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

      <ServiceFeeDialog
        openServiceFeeDialog={openServiceFeeDialog}
        setOpenServiceFeeDialog={setOpenServiceFeeDialog}
      />
    </Box>
  );
}

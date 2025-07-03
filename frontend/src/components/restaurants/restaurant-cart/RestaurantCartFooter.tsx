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
import { useNavigate } from "react-router-dom";

import ServiceFeeDialog from "../../common/ServiceFeeDialog";
import RestaurantCartDeliveryFeeDialog from "./RestaurantCartDeliveryFeeDialog";

import { useAuth } from "@/hooks/contexts/useAuth";
import { useMultiCart } from "@/hooks/contexts/useMultiCart";
import { useSingleRestaurant } from "@/hooks/contexts/useSingleRestaurant";
import { useCreateOrUpdateCart } from "@/hooks/react-query/private/cart/useCreateOrUpdateCart";
import { formatCurrency, isCustomer, isRestaurantOpen } from "@/lib/utils";

export default function RestaurantCartFooter() {
  const { user } = useAuth();
  const { restaurant } = useSingleRestaurant();
  const { getCart, cartTotal } = useMultiCart();

  const { mutateAsync: createOrUpdateCart } = useCreateOrUpdateCart();

  const [openDeliveryFeeDialog, setOpenDeliveryFeeDialog] = useState(false);
  const [openServiceFeeDialog, setOpenServiceFeeDialog] = useState(false);

  const subtotal = cartTotal(restaurant.id);

  const isDeliveryFeeFree = restaurant.delivery_fee === 0;

  const isDiscountApplicable =
    restaurant.discount_rate > 0 && subtotal >= restaurant.min_discount_amount;

  const discount = subtotal * restaurant.discount_rate;

  const total =
    subtotal + restaurant.delivery_fee + restaurant.service_fee - discount;

  const isCheckoutDisabled =
    !isRestaurantOpen(restaurant) || subtotal < restaurant.min_amount;

  const navigate = useNavigate();

  async function handleCartCheckout() {
    if (!isCustomer(user)) {
      navigate("/customer/auth/login");
      return;
    }

    const cart = getCart(restaurant.id);

    const { cart: updatedCart } = await createOrUpdateCart(cart);
    navigate(`/checkout/${updatedCart.cart_id}`);
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
          {!isDeliveryFeeFree
            ? formatCurrency(restaurant.delivery_fee)
            : "Free"}
        </Typography>
      </Stack>

      {restaurant.service_fee > 0 && (
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
              onClick={() => setOpenServiceFeeDialog(true)}
              size="small"
              sx={{ "&:hover": { bgcolor: "transparent" } }}
            >
              <InfoOutlineIcon fontSize="inherit" />
            </IconButton>
          </Stack>

          <Typography variant="body2" component="div">
            {formatCurrency(restaurant.service_fee)}
          </Typography>
        </Stack>
      )}

      {isDiscountApplicable && (
        <Stack
          direction="row"
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Typography variant="body2" component="div">
            {restaurant.discount_rate * 100}% off
          </Typography>

          <Typography variant="body2" component="div">
            -{formatCurrency(discount)}
          </Typography>
        </Stack>
      )}

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
          onClick={handleCartCheckout}
          variant="contained"
          size="large"
          fullWidth
          sx={{ fontWeight: 700 }}
          disabled={isCheckoutDisabled}
        >
          Checkout ({formatCurrency(total)})
        </Button>
      </Box>

      <ServiceFeeDialog
        openServiceFeeDialog={openServiceFeeDialog}
        setOpenServiceFeeDialog={setOpenServiceFeeDialog}
      />

      <RestaurantCartDeliveryFeeDialog
        openDeliveryFeeDialog={openDeliveryFeeDialog}
        setOpenDeliveryFeeDialog={setOpenDeliveryFeeDialog}
      />
    </Box>
  );
}

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

import RestaurantCartDeliveryFeeDialog from "./RestaurantCartDeliveryFeeDialog";

import ServiceFeeDialog from "@/components/common/ServiceFeeDialog";
import { useAuth } from "@/contexts/AuthProvider";
import { useMultiCart } from "@/contexts/MultiCartProvider";
import { useOffers } from "@/contexts/OffersProvider";
import { useRestaurant } from "@/contexts/RestaurantProvider";
import { isCustomer } from "@/lib/utils/auth";
import { formatCurrency } from "@/lib/utils/formatting";
import { getBestRestaurantOfferGivenSubtotal } from "@/lib/utils/restaurants";

export default function RestaurantCartFooter() {
  const { user } = useAuth();
  const { restaurantData } = useRestaurant();
  const { data } = useOffers();
  const { getCart, cartTotal, isCartUpdating } = useMultiCart();

  const [openDeliveryFeeDialog, setOpenDeliveryFeeDialog] = useState(false);
  const [openServiceFeeDialog, setOpenServiceFeeDialog] = useState(false);

  const subtotal = cartTotal(restaurantData.restaurant.id);

  const isDeliveryFeeFree = restaurantData.restaurant.delivery_fee === 0;

  const bestOffer = getBestRestaurantOfferGivenSubtotal(
    data.offers.data,
    subtotal,
  );

  const discount = subtotal * (bestOffer?.discount_rate || 0);

  const total =
    subtotal +
    restaurantData.restaurant.delivery_fee +
    restaurantData.restaurant.service_fee -
    discount;

  const isCheckoutDisabled =
    !restaurantData.restaurant.is_open ||
    subtotal < restaurantData.restaurant.min_amount;

  const navigate = useNavigate();

  async function handleCartCheckout() {
    if (!isCustomer(user)) {
      navigate("/customer/auth/login");
      return;
    }

    const cart = getCart(restaurantData.restaurant.id);
    navigate(`/checkout/${cart.id}`);
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
            ? formatCurrency(restaurantData.restaurant.delivery_fee)
            : "Free"}
        </Typography>
      </Stack>

      {restaurantData.restaurant.service_fee > 0 && (
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
            {formatCurrency(restaurantData.restaurant.service_fee)}
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
          disabled={isCheckoutDisabled || isCartUpdating}
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

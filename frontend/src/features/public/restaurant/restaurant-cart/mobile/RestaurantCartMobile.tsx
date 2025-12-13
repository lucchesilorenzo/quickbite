import { useState } from "react";

import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import { Badge, Button, Paper } from "@mui/material";
import { grey } from "@mui/material/colors";

import RestaurantCartDialogMobile from "./RestaurantCartDialogMobile";

import { useMultiCart } from "@/contexts/MultiCartProvider";
import { useOffers } from "@/contexts/OffersProvider";
import { useRestaurant } from "@/contexts/RestaurantProvider";
import { formatCurrency } from "@/lib/utils/formatting";
import { getBestRestaurantOfferGivenSubtotal } from "@/lib/utils/restaurants";

export default function RestaurantCartMobile() {
  const { restaurantData } = useRestaurant();
  const { offersData } = useOffers();
  const { cartTotal, totalItems } = useMultiCart();

  const [openRestaurantCartDialogMobile, setOpenRestaurantCartDialogMobile] =
    useState(false);

  const subtotal = cartTotal(restaurantData.restaurant.id);

  const bestOffer = getBestRestaurantOfferGivenSubtotal(
    offersData.offers.data,
    subtotal,
  );

  const discount = subtotal * (bestOffer?.discount_rate || 0);

  const total =
    subtotal +
    restaurantData.restaurant.delivery_fee +
    restaurantData.restaurant.service_fee -
    discount;

  return (
    <>
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          p: 2,
          zIndex: 1300,
        }}
      >
        <Button
          variant="contained"
          size="large"
          fullWidth
          sx={{ fontWeight: 700, fontSize: 16, p: 1.5 }}
          onClick={() => setOpenRestaurantCartDialogMobile(true)}
        >
          <Badge
            badgeContent={totalItems(restaurantData.restaurant.id)}
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
            max={20}
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: grey[900],
                color: "#fff",
              },
            }}
          >
            <ShoppingBasketOutlinedIcon sx={{ mr: 1 }} />
          </Badge>
          Cart ({formatCurrency(total)})
        </Button>
      </Paper>

      <RestaurantCartDialogMobile
        openRestaurantCartDialogMobile={openRestaurantCartDialogMobile}
        setOpenRestaurantCartDialogMobile={setOpenRestaurantCartDialogMobile}
      />
    </>
  );
}

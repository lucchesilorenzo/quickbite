import { useState } from "react";

import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import { Badge, Button, Paper } from "@mui/material";

import RestaurantCartDialogMobile from "./RestaurantCartDialogMobile";

import { useMultiCart } from "@/hooks/contexts/useMultiCart";
import { useSingleRestaurant } from "@/hooks/contexts/useSingleRestaurant";
import { formatCurrency } from "@/lib/utils";

export default function RestaurantCartMobile() {
  const { restaurant } = useSingleRestaurant();
  const { cartTotal, totalItems } = useMultiCart();

  const [openRestaurantCartDialogMobile, setOpenRestaurantCartDialogMobile] =
    useState(false);

  const subtotal = cartTotal(restaurant.id);
  const total = subtotal + restaurant.shipping_cost;

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
            badgeContent={totalItems(restaurant.id)}
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: "#212121",
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

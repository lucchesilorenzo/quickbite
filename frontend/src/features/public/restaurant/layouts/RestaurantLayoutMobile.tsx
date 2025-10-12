import { useEffect } from "react";

import { Box } from "@mui/material";

import RestaurantClosedDialog from "../common/RestaurantClosedDialog";
import RestaurantDetailsMobile from "../mobile/RestaurantDetailsMobile";
import RestaurantCartMobile from "../restaurant-cart/mobile/RestaurantCartMobile";

import { useMultiCart } from "@/contexts/MultiCartProvider";
import { useRestaurant } from "@/contexts/RestaurantProvider";

export default function RestaurantLayoutMobile() {
  const {
    restaurant,
    openRestaurantClosedDialog,
    setOpenRestaurantClosedDialog,
  } = useRestaurant();
  const { isEmpty } = useMultiCart();

  useEffect(() => {
    if (!restaurant.is_open) {
      setOpenRestaurantClosedDialog(true);
    }
  }, [restaurant, setOpenRestaurantClosedDialog]);

  return (
    <Box
      component="main"
      sx={{ display: { xs: "block", lg: "none" }, bgcolor: "#FCFCFC" }}
    >
      <RestaurantDetailsMobile />
      {!isEmpty(restaurant.id) && <RestaurantCartMobile />}

      <RestaurantClosedDialog
        openRestaurantClosedDialog={openRestaurantClosedDialog}
        setOpenRestaurantClosedDialog={setOpenRestaurantClosedDialog}
      />
    </Box>
  );
}

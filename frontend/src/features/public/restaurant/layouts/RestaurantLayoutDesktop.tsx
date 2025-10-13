import { useEffect } from "react";

import { Box, Grid } from "@mui/material";

import RestaurantDetails from "../RestaurantDetails";
import RestaurantClosedDialog from "../components/RestaurantClosedDialog";
import RestaurantCart from "../restaurant-cart/RestaurantCart";

import { useRestaurant } from "@/contexts/RestaurantProvider";

export default function RestaurantLayoutDesktop() {
  const {
    restaurant,
    openRestaurantClosedDialog,
    setOpenRestaurantClosedDialog,
  } = useRestaurant();

  useEffect(() => {
    if (!restaurant.is_open) {
      setOpenRestaurantClosedDialog(true);
    }
  }, [restaurant, setOpenRestaurantClosedDialog]);

  return (
    <Box
      component="main"
      sx={{ display: { xs: "none", lg: "block" }, bgcolor: "#FCFCFC" }}
    >
      <Grid container>
        <Grid size={10}>
          <RestaurantDetails />
        </Grid>

        <Grid size={2}>
          <RestaurantCart />
        </Grid>
      </Grid>

      <RestaurantClosedDialog
        openRestaurantClosedDialog={openRestaurantClosedDialog}
        setOpenRestaurantClosedDialog={setOpenRestaurantClosedDialog}
      />
    </Box>
  );
}

import { Paper, Stack, Typography } from "@mui/material";
import { useCart } from "react-use-cart";

import EmptyRestaurantCart from "./EmptyRestaurantCart";

export default function RestaurantCart() {
  const { isEmpty } = useCart();

  return (
    <Paper sx={{ position: "absolute", inset: 0 }} elevation={3}>
      <Stack component="section" sx={{ alignItems: "center", px: 1, py: 2 }}>
        <Typography component="h2" variant="h5" sx={{ fontWeight: 700 }}>
          Cart
        </Typography>

        {isEmpty && <EmptyRestaurantCart />}
      </Stack>
    </Paper>
  );
}

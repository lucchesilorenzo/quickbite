import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import { Stack, Typography } from "@mui/material";

export default function EmptyRestaurantCart() {
  return (
    <Stack spacing={1} sx={{ alignItems: "center", py: 15, px: 2 }}>
      <ShoppingBasketOutlinedIcon fontSize="large" />

      <Typography component="h2" variant="h5" sx={{ fontWeight: 700 }}>
        Fill your cart
      </Typography>

      <Typography component="div" variant="body1" color="textSecondary">
        Your cart is empty
      </Typography>
    </Stack>
  );
}

import { useCheckout } from "@customer/contexts/CheckoutProvider";
import { Box, Stack, Typography } from "@mui/material";

import env from "@/lib/env";

export default function OrderItemsHeader() {
  const { cartData } = useCheckout();

  return (
    <Stack
      direction="row"
      sx={{ alignItems: "center", justifyContent: "space-between" }}
    >
      <Stack spacing={0.5}>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {cartData.cart.restaurant.name}
        </Typography>

        <Typography variant="body2">
          {cartData.cart.restaurant.full_address}
        </Typography>

        <Typography variant="body1">
          {cartData.cart.total_items} articles
        </Typography>
      </Stack>

      <Box
        component="img"
        src={`${env.VITE_BASE_URL}${cartData.cart.restaurant.logo}`}
        alt={cartData.cart.restaurant.name}
        sx={{
          objectFit: "cover",
          width: 50,
          height: 50,
          border: "2px solid #fff",
          borderRadius: 2,
        }}
      />
    </Stack>
  );
}

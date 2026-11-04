import { useCheckout } from "@customer/contexts/CheckoutProvider";
import { Box, Stack, Typography } from "@mui/material";

export default function OrderItemsHeader() {
  const { cartData } = useCheckout();

  return (
    <Stack
      direction="row"
      sx={{ alignItems: "center", justifyContent: "space-between" }}
    >
      <Stack spacing={0.5}>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {cartData.data.restaurant.name}
        </Typography>

        <Typography variant="body2">
          {cartData.data.restaurant.full_address}
        </Typography>

        <Typography variant="body1">
          {cartData.data.total_items} items
        </Typography>
      </Stack>

      <Box
        component="img"
        src={cartData.data.restaurant.logo_url || ""}
        alt={cartData.data.restaurant.name}
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

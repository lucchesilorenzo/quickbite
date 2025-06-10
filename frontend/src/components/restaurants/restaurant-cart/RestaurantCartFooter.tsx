import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import { useMultiCart } from "@/hooks/contexts/useMultiCart";
import { useSingleRestaurant } from "@/hooks/contexts/useSingleRestaurant";
import { formatCurrency } from "@/lib/utils";

export default function RestaurantCartFooter() {
  const { restaurant } = useSingleRestaurant();
  const { cartTotal } = useMultiCart();

  const subtotal = cartTotal(restaurant.id);
  const total = subtotal + restaurant.shipping_cost;

  return (
    <Box component="section" sx={{ mt: 2, p: 2 }}>
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
            onClick={() => {}}
            size="small"
            sx={{ "&:hover": { bgcolor: "transparent" } }}
          >
            <InfoOutlineIcon fontSize="inherit" />
          </IconButton>
        </Stack>

        <Typography variant="body2" component="div">
          {formatCurrency(restaurant.shipping_cost)}
        </Typography>
      </Stack>

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
          variant="contained"
          size="large"
          fullWidth
          sx={{ fontWeight: 700 }}
        >
          Checkout {formatCurrency(total)}
        </Button>
      </Box>
    </Box>
  );
}

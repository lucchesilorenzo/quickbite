import { Box, Divider, Stack, Typography } from "@mui/material";

import { formatCurrency } from "@/lib/utils/formatting";
import { Order, PartnerOrder } from "@/types/order-types";

type ViewOrderFeesAndDiscountsProps = {
  order: Order | PartnerOrder;
};

export default function ViewOrderFeesAndDiscounts({
  order,
}: ViewOrderFeesAndDiscountsProps) {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        Fees and discounts
      </Typography>

      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          Subtotal
        </Typography>

        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {formatCurrency(order.subtotal)}
        </Typography>
      </Stack>

      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <Typography variant="body1">Delivery fee</Typography>

        <Typography variant="body1">
          {order.delivery_fee > 0 ? formatCurrency(order.delivery_fee) : "Free"}
        </Typography>
      </Stack>

      {order.service_fee > 0 && (
        <Stack
          direction="row"
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Typography variant="body1" component="div">
            Service fee
          </Typography>

          <Typography variant="body1" component="div">
            {formatCurrency(order.service_fee)}
          </Typography>
        </Stack>
      )}

      {order.discount > 0 && (
        <Stack
          direction="row"
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Typography variant="body1" component="div">
            {order.discount_rate * 100}% off
          </Typography>

          <Typography variant="body1" component="div">
            -{formatCurrency(order.discount)}
          </Typography>
        </Stack>
      )}

      <Divider sx={{ my: 2 }} />

      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <Typography variant="body1" sx={{ fontWeight: 600 }}>
          Total
        </Typography>

        <Typography variant="body1" sx={{ fontWeight: 600 }}>
          {formatCurrency(order.total)}
        </Typography>
      </Stack>
    </Box>
  );
}

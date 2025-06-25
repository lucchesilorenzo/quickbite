import { Box, Stack, Typography, useMediaQuery } from "@mui/material";

import OrderItem from "./OrderItem";

import { Order } from "@/types/order-types";

type OrdersListProps = {
  orders: Order[];
};

export default function OrdersList({ orders }: OrdersListProps) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Box>
      <Typography
        variant={isMobile ? "body1" : "h6"}
        sx={{ mb: 2, fontWeight: 700 }}
      >
        Order history
      </Typography>

      <Stack spacing={2}>
        {orders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </Stack>
    </Box>
  );
}

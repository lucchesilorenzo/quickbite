import { Box, Stack, Typography } from "@mui/material";

import OrderItem from "./OrderItem";

import { Order } from "@/types/order-types";

type OrdersListProps = {
  orders: Order[];
};

export default function OrdersList({ orders }: OrdersListProps) {
  return (
    <Box sx={{ maxHeight: 650, overflowY: "auto", p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
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

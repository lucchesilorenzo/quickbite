import { Box, Stack, Typography } from "@mui/material";

import OrderItem from "./OrderItem";

import CustomPagination from "@/components/common/CustomPagination";
import { Order } from "@/types/order-types";

type OrdersListProps = {
  orders: Order[];
  totalPages: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export default function OrdersList({
  orders,
  totalPages,
  page,
  setPage,
}: OrdersListProps) {
  return (
    <Box sx={{ maxHeight: 650, overflowY: "auto", p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
        Order history
      </Typography>

      <Stack spacing={4}>
        {orders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}

        <Box sx={{ alignSelf: "center" }}>
          <CustomPagination
            context="ordersPage"
            page={page}
            totalPages={totalPages}
            setPage={setPage}
          />
        </Box>
      </Stack>
    </Box>
  );
}

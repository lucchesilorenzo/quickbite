import { Box, Typography } from "@mui/material";
import { PartnerOrder } from "@partner/types/orders/order.types";
import { Order } from "@private/shared/types/order.types";

import ViewOrderItem from "../ViewOrderItem";

type ViewOrderItemsListProps = {
  order: Order | PartnerOrder;
};

export default function ViewOrderItemsList({ order }: ViewOrderItemsListProps) {
  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        Your articles
      </Typography>

      {order.order_items.map((item, index) => (
        <ViewOrderItem
          key={item.id}
          item={item}
          isLast={index === order.order_items.length - 1}
        />
      ))}
    </Box>
  );
}

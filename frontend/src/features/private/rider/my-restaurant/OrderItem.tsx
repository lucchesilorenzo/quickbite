import { Box, Divider, Typography } from "@mui/material";
import { type OrderItem } from "@private/shared/types/order.types";

type OrderItemProps = {
  item: OrderItem;
  isLast: boolean;
};

export default function OrderItem({ item, isLast }: OrderItemProps) {
  return (
    <>
      <Box>
        <Typography variant="body2" component="span" sx={{ mr: 0.5 }}>
          {item.quantity}
        </Typography>

        <Typography variant="body2" component="span">
          {item.name}
        </Typography>
      </Box>

      {!isLast && <Divider sx={{ my: 2 }} />}
    </>
  );
}

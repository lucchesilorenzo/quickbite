import { Box, Divider, Typography } from "@mui/material";

import { OrderItemResource } from "@/api/models";

type OrderItemProps = {
  item: OrderItemResource;
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

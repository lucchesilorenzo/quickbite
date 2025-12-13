import { useCheckout } from "@customer/contexts/CheckoutProvider";
import { Box } from "@mui/material";

import OrderItem from "./OrderItem";

export default function OrderItemsList() {
  const { cartData } = useCheckout();

  return (
    <Box>
      {cartData.cart.items.map((item, index) => (
        <OrderItem
          key={item.id}
          item={item}
          isLast={index === cartData.cart.items.length - 1}
        />
      ))}
    </Box>
  );
}

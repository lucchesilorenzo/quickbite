import { Box } from "@mui/material";

import RestaurantCartItem from "./RestaurantCartItem";

import { useMultiCart } from "@/hooks/contexts/useMultiCart";
import { useSingleRestaurant } from "@/hooks/contexts/useSingleRestaurant";

export default function RestaurantCartList() {
  const { restaurant } = useSingleRestaurant();
  const { getItems } = useMultiCart();

  const items = getItems(restaurant.id);

  return (
    <Box>
      {items.map((item, index) => (
        <RestaurantCartItem key={item.id} item={item} index={index} />
      ))}
    </Box>
  );
}

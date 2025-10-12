import { Box } from "@mui/material";

import RestaurantCartItem from "./RestaurantCartItem";

import { useMultiCart } from "@/contexts/public/MultiCartProvider";
import { useRestaurant } from "@/contexts/public/RestaurantProvider";

export default function RestaurantCartList() {
  const { restaurant } = useRestaurant();
  const { getItems } = useMultiCart();

  const items = getItems(restaurant.id);

  return (
    <Box sx={{ maxHeight: 650, overflowY: "auto", p: 2 }}>
      {items.map((item, index) => (
        <RestaurantCartItem key={item.id} item={item} index={index} />
      ))}
    </Box>
  );
}

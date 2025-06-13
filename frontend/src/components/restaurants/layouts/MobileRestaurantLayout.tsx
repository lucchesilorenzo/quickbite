import { Box } from "@mui/material";

import RestaurantCartMobile from "../mobile/RestaurantCartMobile";
import RestaurantDetailsMobile from "../mobile/RestaurantDetailsMobile";

import { useMultiCart } from "@/hooks/contexts/useMultiCart";
import { useSingleRestaurant } from "@/hooks/contexts/useSingleRestaurant";

export default function MobileRestaurantLayout() {
  const { restaurant } = useSingleRestaurant();
  const { isEmpty } = useMultiCart();

  return (
    <Box
      component="main"
      sx={{ display: { xs: "block", lg: "none" }, bgcolor: "#FCFCFC" }}
    >
      <RestaurantDetailsMobile />
      {!isEmpty(restaurant.id) && <RestaurantCartMobile />}
    </Box>
  );
}

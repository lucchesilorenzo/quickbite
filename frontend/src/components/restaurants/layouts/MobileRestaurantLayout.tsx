import { useEffect } from "react";

import { Box } from "@mui/material";

import RestaurantClosedDialog from "../common/RestaurantClosedDialog";
import RestaurantCartMobile from "../mobile/RestaurantCartMobile";
import RestaurantDetailsMobile from "../mobile/RestaurantDetailsMobile";

import { useMultiCart } from "@/hooks/contexts/useMultiCart";
import { useSingleRestaurant } from "@/hooks/contexts/useSingleRestaurant";
import { isRestaurantOpen } from "@/lib/utils";

export default function MobileRestaurantLayout() {
  const {
    restaurant,
    openRestaurantClosedDialog,
    setOpenRestaurantClosedDialog,
  } = useSingleRestaurant();
  const { isEmpty } = useMultiCart();

  useEffect(() => {
    if (!isRestaurantOpen(restaurant)) {
      setOpenRestaurantClosedDialog(true);
    }
  }, [restaurant, setOpenRestaurantClosedDialog]);

  return (
    <Box
      component="main"
      sx={{ display: { xs: "block", lg: "none" }, bgcolor: "#FCFCFC" }}
    >
      <RestaurantDetailsMobile />
      {!isEmpty(restaurant.id) && <RestaurantCartMobile />}

      <RestaurantClosedDialog
        openRestaurantClosedDialog={openRestaurantClosedDialog}
        setOpenRestaurantClosedDialog={setOpenRestaurantClosedDialog}
      />
    </Box>
  );
}

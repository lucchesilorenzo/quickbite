import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
} from "@mui/material";

import RestaurantCartMOVNotReachedAlert from "../common/RestaurantCartMOVNotReachedAlert";
import RestaurantCartShippingInfo from "../common/RestaurantCartShippingInfo";
import RestaurantCartFooter from "../restaurant-cart/RestaurantCartFooter";
import RestaurantCartList from "../restaurant-cart/RestaurantCartList";

import { useMultiCart } from "@/hooks/contexts/useMultiCart";
import { useSingleRestaurant } from "@/hooks/contexts/useSingleRestaurant";

type RestaurantCartDialogMobileProps = {
  openRestaurantCartDialogMobile: boolean;
  setOpenRestaurantCartDialogMobile: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

export default function RestaurantCartDialogMobile({
  openRestaurantCartDialogMobile,
  setOpenRestaurantCartDialogMobile,
}: RestaurantCartDialogMobileProps) {
  const { restaurant } = useSingleRestaurant();
  const { cartTotal } = useMultiCart();

  const subtotal = cartTotal(restaurant.id);
  const amountToReachMOV = restaurant.min_amount - subtotal;
  const showMOVNotReachedAlert =
    restaurant.min_amount > 0 && amountToReachMOV > 0;

  return (
    <Dialog
      open={openRestaurantCartDialogMobile}
      onClose={() => setOpenRestaurantCartDialogMobile(false)}
      fullScreen
      disableRestoreFocus
    >
      <Stack spacing={2} sx={{ p: 2 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <DialogTitle sx={{ p: 0, fontWeight: 700 }}>Cart</DialogTitle>

          <IconButton
            color="inherit"
            aria-label="close"
            onClick={() => setOpenRestaurantCartDialogMobile(false)}
            sx={{ p: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <DialogContent sx={{ p: 0 }}>
          <RestaurantCartShippingInfo />
          {showMOVNotReachedAlert && (
            <RestaurantCartMOVNotReachedAlert
              amountToReachMOV={amountToReachMOV}
            />
          )}
          <RestaurantCartList />
          <RestaurantCartFooter />
        </DialogContent>
      </Stack>
    </Dialog>
  );
}

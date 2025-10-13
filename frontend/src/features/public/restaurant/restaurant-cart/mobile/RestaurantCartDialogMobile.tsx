import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
} from "@mui/material";

import RestaurantCartFooter from "../RestaurantCartFooter";
import RestaurantCartList from "../RestaurantCartList";
import RestaurantCartMOVNotReachedAlert from "../components/RestaurantCartMOVNotReachedAlert";
import RestaurantCartShippingInfo from "../components/RestaurantCartShippingInfo";
import RestaurantCartSpinner from "../components/RestaurantCartSpinner";

import { useMultiCart } from "@/contexts/MultiCartProvider";
import { useRestaurant } from "@/contexts/RestaurantProvider";

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
  const { restaurant } = useRestaurant();
  const { cartTotal, isEmpty, isCartUpdating } = useMultiCart();

  const subtotal = cartTotal(restaurant.id);
  const amountToReachMOV = restaurant.min_amount - subtotal;
  const showMOVNotReachedAlert =
    restaurant.min_amount > 0 &&
    amountToReachMOV > 0 &&
    !isEmpty(restaurant.id);

  return (
    <Dialog
      open={openRestaurantCartDialogMobile}
      onClose={() => setOpenRestaurantCartDialogMobile(false)}
      fullScreen
      disableRestoreFocus
    >
      {isCartUpdating && <RestaurantCartSpinner />}

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

import { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Button,
  DialogActions,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";

import { useMultiCart } from "@/contexts/MultiCartProvider";
import { useRestaurant } from "@/contexts/RestaurantProvider";
import { formatCurrency } from "@/lib/utils/formatting";
import { CartItem } from "@/types/cart-types";
import { MenuItem } from "@/types/menu-types";

type MenuItemDialogActionsProps = {
  menuItem: MenuItem | CartItem;
  setOpenMenuItemDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MenuItemDialogActions({
  menuItem,
  setOpenMenuItemDialog,
}: MenuItemDialogActionsProps) {
  const { restaurant } = useRestaurant();
  const { addItem } = useMultiCart();

  const [menuItemQuantity, setMenuItemQuantity] = useState(1);

  const totalPrice = menuItem.price * menuItemQuantity;

  function handleAddToCart() {
    addItem(restaurant, menuItem, menuItemQuantity);

    setMenuItemQuantity(1);
    setOpenMenuItemDialog(false);
  }

  return (
    <DialogActions sx={{ p: 0, mt: "auto" }}>
      <Paper sx={{ p: 2, width: 1 }} elevation={4}>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              alignItems: "center",
              bgcolor: grey[100],
              borderRadius: 5,
            }}
          >
            <IconButton
              color="inherit"
              aria-label="remove"
              onClick={() =>
                setMenuItemQuantity((menuItemQuantity) => menuItemQuantity - 1)
              }
              disabled={menuItemQuantity === 1}
            >
              <RemoveIcon />
            </IconButton>

            <Typography variant="body1" sx={{ fontWeight: 700 }}>
              {menuItemQuantity}
            </Typography>

            <IconButton
              color="inherit"
              aria-label="add"
              onClick={() =>
                setMenuItemQuantity((menuItemQuantity) => menuItemQuantity + 1)
              }
            >
              <AddIcon />
            </IconButton>
          </Stack>

          <Button
            variant="contained"
            sx={{ flex: 1, fontSize: 16, borderRadius: 5 }}
            onClick={handleAddToCart}
          >
            {formatCurrency(totalPrice)}
          </Button>
        </Stack>
      </Paper>
    </DialogActions>
  );
}

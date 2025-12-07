import { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";

import MenuItemDialog from "../menu-category-navigation/MenuItemDialog";

import { useMultiCart } from "@/contexts/MultiCartProvider";
import { useRestaurant } from "@/contexts/RestaurantProvider";
import { formatCurrency } from "@/lib/utils/formatting";
import { CartItem } from "@/types/cart.types";

type RestaurantCartItemProps = {
  item: CartItem;
  index: number;
};

export default function RestaurantCartItem({
  item,
  index,
}: RestaurantCartItemProps) {
  const { restaurantData } = useRestaurant();
  const {
    isCartUpdating,
    totalUniqueItems,
    incrementItemQuantity,
    decrementItemQuantity,
    getItem,
  } = useMultiCart();

  const [openMenuItemDialog, setOpenMenuItemDialog] = useState(false);

  const totalUniqueCartItems = totalUniqueItems(restaurantData.restaurant.id);
  const itemTotal =
    getItem(restaurantData.restaurant.id, item.id)?.item_total ?? 0;

  return (
    <Box>
      <Stack
        direction="row"
        sx={{ alignItems: "center", justifyContent: "space-between", mb: 1 }}
      >
        <Button
          variant="text"
          color="inherit"
          onClick={() => setOpenMenuItemDialog(true)}
          sx={{
            fontWeight: 700,
            textDecoration: "underline",
            textTransform: "none",
            p: 0,
            "&:hover": { textDecoration: "none", bgcolor: "transparent" },
          }}
        >
          {item.name}
        </Button>

        <Typography variant="body2" component="div">
          {formatCurrency(itemTotal)}
        </Typography>
      </Stack>

      <Stack direction="row" sx={{ justifyContent: "flex-end" }}>
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
              decrementItemQuantity(restaurantData.restaurant.id, item.id)
            }
            disabled={isCartUpdating}
          >
            {item.quantity === 1 ? (
              <DeleteOutlineOutlinedIcon fontSize="small" />
            ) : (
              <RemoveIcon fontSize="small" />
            )}
          </IconButton>

          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            {item.quantity}
          </Typography>

          <IconButton
            color="inherit"
            aria-label="add"
            onClick={() =>
              incrementItemQuantity(restaurantData.restaurant.id, item.id)
            }
            disabled={isCartUpdating}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>

      {index !== totalUniqueCartItems - 1 && <Divider sx={{ my: 2 }} />}

      <MenuItemDialog
        menuItem={item}
        openMenuItemDialog={openMenuItemDialog}
        setOpenMenuItemDialog={setOpenMenuItemDialog}
      />
    </Box>
  );
}

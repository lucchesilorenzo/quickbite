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

import { formatCurrency } from "@/lib/utils";
import { MenuItem } from "@/types";

type MenuItemDialogActionsProps = {
  menuItem: MenuItem;
};

export default function MenuItemDialogActions({
  menuItem,
}: MenuItemDialogActionsProps) {
  const [menuItemQuantity, setMenuItemQuantity] = useState(1);

  const totalPrice = menuItem.price * menuItemQuantity;

  function handleAddToCart() {}

  return (
    <DialogActions sx={{ p: 0 }}>
      <Paper
        sx={{
          width: 1,
          position: "sticky",
          bottom: 0,
          borderRadius: 0,
          p: 2,
          zIndex: 1,
        }}
        elevation={4}
      >
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              alignItems: "center",
              bgcolor: grey[100],
              borderRadius: 4,
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
            sx={{ flex: 1, fontSize: 16, borderRadius: 4 }}
            onClick={handleAddToCart}
          >
            {formatCurrency(totalPrice)}
          </Button>
        </Stack>
      </Paper>
    </DialogActions>
  );
}

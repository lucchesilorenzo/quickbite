import { useState } from "react";

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  DialogTitle,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";

import MenuItemAddButton from "../common/MenuItemAddButton";
import MenuItemQuantityInCartBadge from "../common/MenuItemQuantityInCartBadge";
import MenuItemDialog from "./MenuItemDialog";

import { useMultiCart } from "@/hooks/contexts/useMultiCart";
import { useSingleRestaurant } from "@/hooks/contexts/useSingleRestaurant";
import env from "@/lib/env";
import { formatCurrency } from "@/lib/utils";
import { MenuItem } from "@/types";

type MenuItemCardProps = {
  menuItem: MenuItem;
};

export default function MenuItemCard({ menuItem }: MenuItemCardProps) {
  const { restaurant } = useSingleRestaurant();
  const { inCart } = useMultiCart();

  const [openMenuItemDialog, setOpenMenuItemDialog] = useState(false);

  return (
    <>
      <Card elevation={3}>
        <CardActionArea
          disabled={!menuItem.is_available}
          sx={{
            p: 2,
            bgcolor: !menuItem.is_available ? grey[100] : "",
            "&:hover": { bgcolor: grey[100] },
          }}
          onClick={() => setOpenMenuItemDialog(true)}
        >
          <Box sx={{ py: 2 }}>
            {menuItem.image ? (
              <CardMedia
                component="img"
                sx={{ height: 100, position: "relative" }}
                image={`${env.VITE_BASE_URL}${menuItem.image}`}
                alt={menuItem.name}
                title={menuItem.name}
              />
            ) : (
              <Box sx={{ height: 100 }}></Box>
            )}
          </Box>

          <CardContent sx={{ p: 0 }}>
            {menuItem.is_available && inCart(restaurant.id, menuItem.id) ? (
              <MenuItemQuantityInCartBadge
                type="from-search"
                menuItem={menuItem}
              />
            ) : (
              menuItem.is_available && <MenuItemAddButton type="from-search" />
            )}

            <DialogTitle
              component="h3"
              variant="h6"
              sx={{
                fontWeight: 700,
                mt: 4,
                p: 0,
                color: !menuItem.is_available ? grey[500] : "",
              }}
            >
              {menuItem.name}
            </DialogTitle>

            <Box sx={{ my: 4 }}></Box>

            <Typography
              component="h4"
              variant="body1"
              sx={{
                fontWeight: 500,
                color: !menuItem.is_available ? grey[500] : "",
              }}
            >
              {menuItem.is_available
                ? formatCurrency(menuItem.price)
                : "Unavailable"}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <MenuItemDialog
        menuItem={menuItem}
        openMenuItemDialog={openMenuItemDialog}
        setOpenMenuItemDialog={setOpenMenuItemDialog}
      />
    </>
  );
}

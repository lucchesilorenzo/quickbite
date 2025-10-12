import { useState } from "react";

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { grey } from "@mui/material/colors";

import MenuItemQuantityInCartBadge from "../../common/menu-category-navigation/MenuItemQuantityInCartBadge";
import MenuItemAddButton from "../common/MenuItemAddButton";
import MenuItemDialog from "./MenuItemDialog";

import { useMultiCart } from "@/contexts/public/MultiCartProvider";
import { useRestaurant } from "@/contexts/public/RestaurantProvider";
import env from "@/lib/env";
import { formatCurrency } from "@/lib/utils/formatting";
import { MenuItem } from "@/types";

type MenuItemCardProps = {
  menuItem: MenuItem;
};

export default function MenuItemCard({ menuItem }: MenuItemCardProps) {
  const { restaurant } = useRestaurant();
  const { inCart } = useMultiCart();

  const [openMenuItemDialog, setOpenMenuItemDialog] = useState(false);

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <>
      <Card elevation={3}>
        <Box
          role="button"
          sx={{
            position: "relative",
            p: 2,
            bgcolor: !menuItem.is_available ? grey[100] : "",
            "&:hover": {
              bgcolor: grey[100],
              cursor: menuItem.is_available ? "pointer" : "default",
            },
          }}
          onClick={() => {
            if (!menuItem.is_available) return;

            setOpenMenuItemDialog(true);
          }}
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

          <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
            {menuItem.is_available && inCart(restaurant.id, menuItem.id) ? (
              <MenuItemQuantityInCartBadge
                type="from-search"
                menuItem={menuItem}
              />
            ) : (
              menuItem.is_available && <MenuItemAddButton type="from-search" />
            )}

            <Typography
              component="h3"
              variant={isMobile ? "body1" : "h6"}
              sx={{
                fontWeight: 700,
                color: !menuItem.is_available ? grey[500] : "",
                mt: 4,
              }}
            >
              {menuItem.name}
            </Typography>

            <Typography
              component="h4"
              variant={isMobile ? "body2" : "body1"}
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
        </Box>
      </Card>

      <MenuItemDialog
        menuItem={menuItem}
        openMenuItemDialog={openMenuItemDialog}
        setOpenMenuItemDialog={setOpenMenuItemDialog}
      />
    </>
  );
}

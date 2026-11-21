import React from "react";

import {
  Divider,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

import MenuItemQuantityInCartBadge from "../MenuItemQuantityInCartBadge";

import { useAuth } from "@/contexts/AuthProvider";
import { isCustomer } from "@/lib/utils/auth.utils";
import { MenuNavigationCategory } from "@/types/menu.types";

type MenuCategoryNavigationItemProps = {
  menuCategory: MenuNavigationCategory;
  isLast: boolean;
  setOpenMenuCategoryNavigationDialog: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  onSlideClick: (menuCategoryId: string) => void;
};

export default function MenuCategoryNavigationItem({
  menuCategory,
  isLast,
  setOpenMenuCategoryNavigationDialog,
  onSlideClick,
}: MenuCategoryNavigationItemProps) {
  const { user } = useAuth();

  const showInCartBadge = user === null || isCustomer(user);

  return (
    <>
      <ListItem
        disableGutters
        disablePadding
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <ListItemButton
          onClick={() => {
            onSlideClick(menuCategory.id);
            setOpenMenuCategoryNavigationDialog(false);
          }}
        >
          <ListItemText
            primary={
              <Typography variant="body1" sx={{ fontWeight: 700 }}>
                {menuCategory.name}
              </Typography>
            }
          />
        </ListItemButton>

        {showInCartBadge && menuCategory.menuItems && (
          <MenuItemQuantityInCartBadge
            type="from-search"
            menuItems={menuCategory.menuItems}
          />
        )}
      </ListItem>

      {!isLast && <Divider />}
    </>
  );
}

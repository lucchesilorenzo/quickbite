import React from "react";

import {
  Divider,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

import MenuItemQuantityInCartBadge from "../common/MenuItemQuantityInCartBadge";

import { MenuCategory } from "@/types";

type MenuCategoryNavigationItemProps = {
  menuCategory: MenuCategory;
  isLast: boolean;
  setOpenMenuCategoryNavigationDialog: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  onHandleClick: (menuCategoryId: string) => void;
};

export default function MenuCategoryNavigationItem({
  menuCategory,
  isLast,
  setOpenMenuCategoryNavigationDialog,
  onHandleClick,
}: MenuCategoryNavigationItemProps) {
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
            onHandleClick(menuCategory.id);
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

        <MenuItemQuantityInCartBadge
          type="from-search"
          menuCategory={menuCategory}
        />
      </ListItem>

      {!isLast && <Divider />}
    </>
  );
}

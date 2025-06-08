import React from "react";

import {
  Divider,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

type MenuCategoryNavigationItemProps = {
  menuCategory: string;
  index: number;
  menuCategories: string[];
  setOpenMenuCategoryNavigationDialog: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  onHandleClick: (menuCategory: string) => void;
};

export default function MenuCategoryNavigationItem({
  menuCategory,
  index,
  menuCategories,
  setOpenMenuCategoryNavigationDialog,
  onHandleClick,
}: MenuCategoryNavigationItemProps) {
  return (
    <>
      <ListItem disableGutters disablePadding>
        <ListItemButton
          onClick={() => {
            onHandleClick(menuCategory);
            setOpenMenuCategoryNavigationDialog(false);
          }}
        >
          <ListItemText
            primary={
              <Typography variant="body1" sx={{ fontWeight: 700 }}>
                {menuCategory}
              </Typography>
            }
          />
        </ListItemButton>
      </ListItem>

      {index !== menuCategories.length - 1 && <Divider />}
    </>
  );
}

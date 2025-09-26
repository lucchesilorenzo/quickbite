import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  Stack,
  useMediaQuery,
} from "@mui/material";

import MenuCategoryNavigationItem from "./MenuCategoryNavigationItem";

import { MenuCategory, PartnerMenu } from "@/types";

type MenuCategoryNavigationDialogProps = {
  menuCategories: MenuCategory[] | PartnerMenu[];
  openMenuCategoryNavigationDialog: boolean;
  title?: string;
  setOpenMenuCategoryNavigationDialog: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  onSlideClick: (menuCategoryId: string) => void;
};

export default function MenuCategoryNavigationDialog({
  menuCategories,
  openMenuCategoryNavigationDialog,
  title = "Categories",
  setOpenMenuCategoryNavigationDialog,
  onSlideClick,
}: MenuCategoryNavigationDialogProps) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Dialog
      open={openMenuCategoryNavigationDialog}
      onClose={() => setOpenMenuCategoryNavigationDialog(false)}
      fullWidth={!isMobile}
      fullScreen={isMobile}
      disableRestoreFocus
    >
      <Stack spacing={2}>
        <Stack direction="row" sx={{ justifyContent: "space-between", p: 2 }}>
          <DialogTitle sx={{ p: 0, fontWeight: 700 }}>{title}</DialogTitle>

          <IconButton
            color="inherit"
            aria-label="close"
            onClick={() => setOpenMenuCategoryNavigationDialog(false)}
            sx={{ p: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <DialogContent
          sx={{ p: 0, maxHeight: isMobile ? 800 : 600, overflowY: "auto" }}
        >
          <List disablePadding>
            {menuCategories.map((menuCategory, index) => (
              <MenuCategoryNavigationItem
                key={menuCategory.id}
                menuCategory={menuCategory}
                isLast={index === menuCategories.length - 1}
                setOpenMenuCategoryNavigationDialog={
                  setOpenMenuCategoryNavigationDialog
                }
                onSlideClick={onSlideClick}
              />
            ))}
          </List>
        </DialogContent>
      </Stack>
    </Dialog>
  );
}

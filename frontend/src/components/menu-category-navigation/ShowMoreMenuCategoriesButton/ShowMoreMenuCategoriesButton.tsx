import { useState } from "react";

import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { IconButton } from "@mui/material";
import { grey } from "@mui/material/colors";

import MenuCategoryNavigationDialog from "@/components/menu-category-navigation/MenuCategoryNavigationDialog";
import { PartnerMenu } from "@/features/private/partner/types/menu.types";
import { MenuCategory } from "@/types/menu/menu.types";

type ShowMoreMenuCategoriesButtonProps = {
  menuCategories: MenuCategory[] | PartnerMenu[];
  onSlideClick: (menuCategoryId: string) => void;
};

export default function ShowMoreMenuCategoriesButton({
  menuCategories,
  onSlideClick,
}: ShowMoreMenuCategoriesButtonProps) {
  const [
    openMenuCategoryNavigationDialog,
    setOpenMenuCategoryNavigationDialog,
  ] = useState(false);

  return (
    <>
      <IconButton
        onClick={() => setOpenMenuCategoryNavigationDialog(true)}
        color="inherit"
        sx={{
          bgcolor: grey[200],
          "&:hover": {
            bgcolor: grey[300],
          },
        }}
        size="small"
      >
        <FormatListBulletedIcon fontSize="small" />
      </IconButton>

      <MenuCategoryNavigationDialog
        menuCategories={menuCategories}
        openMenuCategoryNavigationDialog={openMenuCategoryNavigationDialog}
        title="Menu categories"
        setOpenMenuCategoryNavigationDialog={
          setOpenMenuCategoryNavigationDialog
        }
        onSlideClick={onSlideClick}
      />
    </>
  );
}

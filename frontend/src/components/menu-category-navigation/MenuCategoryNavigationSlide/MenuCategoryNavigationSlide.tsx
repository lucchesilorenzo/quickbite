import { Button } from "@mui/material";
import { grey } from "@mui/material/colors";
import { PartnerMenu } from "@partner/types/menu/menu.types";

import { MenuCategory } from "@/types/menu/menu.types";

type MenuCategoryNavigationSlideProps = {
  menuCategory: MenuCategory | PartnerMenu;
  selectedMenuCategoryId: string;
  onSlideClick: (id: string) => void;
};

export default function MenuCategoryNavigationSlide({
  menuCategory,
  selectedMenuCategoryId,
  onSlideClick,
}: MenuCategoryNavigationSlideProps) {
  return (
    <Button
      onClick={() => onSlideClick(menuCategory.id)}
      sx={{
        width: 100,
        textTransform: "none",
        whiteSpace: "nowrap",
        borderRadius: 2,
        color: "inherit",
        transition: "0.2s ease-in-out",
        "&:hover": { bgcolor: grey[200] },
        ...(selectedMenuCategoryId === menuCategory.id && {
          bgcolor: "#262626",
          color: "white",
          "&:hover": { bgcolor: "#333333" },
        }),
      }}
    >
      {menuCategory.name}
    </Button>
  );
}

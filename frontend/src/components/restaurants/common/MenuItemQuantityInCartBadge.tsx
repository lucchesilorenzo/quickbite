import { Badge } from "@mui/material";
import { grey } from "@mui/material/colors";

import { useMultiCart } from "@/hooks/contexts/useMultiCart";
import { useSingleRestaurant } from "@/hooks/contexts/useSingleRestaurant";
import { MenuCategory, MenuItem } from "@/types";

type MenuItemQuantityInCartBadgeProps = {
  type: "from-list" | "from-search";
  menuItem?: MenuItem;
  menuCategory?: MenuCategory;
};

export default function MenuItemQuantityInCartBadge({
  type,
  menuItem,
  menuCategory,
}: MenuItemQuantityInCartBadgeProps) {
  const { restaurant } = useSingleRestaurant();
  const { getItem } = useMultiCart();

  const menuItemQuantity =
    menuItem && getItem(restaurant.id, menuItem.id)?.quantity;

  const menuCategoryQuantity =
    menuCategory &&
    menuCategory.menu_items.reduce((acc, item) => {
      const quantity = getItem(restaurant.id, item.id)?.quantity ?? 0;
      return acc + quantity;
    }, 0);

  const badgeContent = menuItemQuantity || menuCategoryQuantity;

  return (
    <Badge
      badgeContent={badgeContent}
      max={99}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      sx={{
        position: "absolute",
        top: type === "from-list" ? 6 : 26,
        right: type === "from-list" ? 6 : 26,
        "& .MuiBadge-badge": {
          backgroundColor: type === "from-list" ? "#212121" : grey[100],
          color: type === "from-list" ? "#fff" : "#212121",
          px: 1.5,
          py: 2,
          borderRadius: 5,
          fontSize: 14,
          fontWeight: 700,
        },
      }}
    />
  );
}

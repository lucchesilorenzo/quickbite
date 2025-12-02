import { Badge } from "@mui/material";
import { grey } from "@mui/material/colors";

import { useMultiCart } from "@/contexts/MultiCartProvider";
import { useRestaurant } from "@/contexts/RestaurantProvider";
import { PartnerMenu } from "@/features/private/partner/types/menu.types";
import { MenuCategory, MenuItem } from "@/types/menu.types";

type MenuItemQuantityInCartBadgeProps = {
  type: "from-list" | "from-search";
  menuItem?: MenuItem;
  menuCategory?: MenuCategory | PartnerMenu;
};

export default function MenuItemQuantityInCartBadge({
  type,
  menuItem,
  menuCategory,
}: MenuItemQuantityInCartBadgeProps) {
  const { restaurant } = useRestaurant();
  const { getItem } = useMultiCart();

  const menuItemQuantity =
    menuItem && getItem(restaurant.id, menuItem.id)?.quantity;

  const menuCategoryQuantity =
    menuCategory &&
    (menuCategory.menu_items as MenuItem[]).reduce((acc, item) => {
      const quantity = getItem(restaurant.id, item.id)?.quantity ?? 0;
      return acc + quantity;
    }, 0);

  const badgeContent = menuItemQuantity || menuCategoryQuantity;

  return (
    <Badge
      role="status"
      badgeContent={badgeContent}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      max={20}
      sx={{
        position: "absolute",
        top: type === "from-list" ? 6 : 26,
        right: type === "from-list" ? 6 : 26,
        "& .MuiBadge-badge": {
          backgroundColor: type === "from-list" ? grey[900] : grey[100],
          color: type === "from-list" ? "#fff" : grey[900],
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

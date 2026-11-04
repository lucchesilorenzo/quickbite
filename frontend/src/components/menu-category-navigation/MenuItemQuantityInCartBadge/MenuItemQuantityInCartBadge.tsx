import { Badge } from "@mui/material";
import { grey } from "@mui/material/colors";
import { PartnerMenu } from "@partner/types/menu/menu.types";

import { MenuCategoryResource, MenuItemResource } from "@/api/models";
import { useMultiCart } from "@/contexts/MultiCartProvider";
import { useRestaurant } from "@/contexts/RestaurantProvider";

type MenuItemQuantityInCartBadgeProps = {
  type: "from-list" | "from-search";
  menuItem?: MenuItemResource;
  menuCategory?: MenuCategoryResource | PartnerMenu;
};

export default function MenuItemQuantityInCartBadge({
  type,
  menuItem,
  menuCategory,
}: MenuItemQuantityInCartBadgeProps) {
  const { restaurantData } = useRestaurant();
  const { getItem } = useMultiCart();

  const menuItemQuantity =
    menuItem && getItem(restaurantData.data.id, menuItem.id)?.quantity;

  const menuCategoryItems = Array.isArray(menuCategory?.menu_items)
    ? menuCategory.menu_items
    : (menuCategory?.menu_items?.data ?? []);

  const menuCategoryQuantity = menuCategoryItems.reduce((acc, item) => {
    const quantity = getItem(restaurantData.data.id, item.id)?.quantity ?? 0;

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

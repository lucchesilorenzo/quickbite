import { Badge } from "@mui/material";
import { grey } from "@mui/material/colors";

import { useMultiCart } from "@/hooks/contexts/useMultiCart";
import { useSingleRestaurant } from "@/hooks/contexts/useSingleRestaurant";
import { MenuItem } from "@/types";

type MenuItemQuantityInCartBadgeProps = {
  type: "from-list" | "from-search";
  menuItem: MenuItem;
};

export default function MenuItemQuantityInCartBadge({
  type,
  menuItem,
}: MenuItemQuantityInCartBadgeProps) {
  const { restaurant } = useSingleRestaurant();
  const { getItem } = useMultiCart();

  const quantity = getItem(restaurant.id, menuItem.id)?.quantity;

  return (
    <Badge
      badgeContent={quantity}
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

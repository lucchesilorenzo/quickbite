import { Stack, Typography } from "@mui/material";

import PartnerMenuEditMenuItem from "./PartnerMenuEditMenuItem";

import { usePartnerRestaurant } from "@/hooks/contexts/usePartnerRestaurant";
import { usePartnerRestaurantMenu } from "@/hooks/contexts/usePartnerRestaurantMenu";

export default function PartnerMenuEditMenuItemsList() {
  const { restaurant } = usePartnerRestaurant();
  const { selectedMenuCategoryId } = usePartnerRestaurantMenu();

  const menuItems = restaurant.menu_categories.find(
    (menuCategory) => menuCategory.id === selectedMenuCategoryId,
  )?.menu_items;

  if (!menuItems || !menuItems.length) {
    return (
      <Typography variant="body2" sx={{ textAlign: "center", mt: 4 }}>
        {selectedMenuCategoryId
          ? "No menu items found. A menu category must have at least one menu item."
          : "Select a menu category."}
      </Typography>
    );
  }

  return (
    <Stack spacing={2} sx={{ mt: 4 }}>
      {menuItems.map((menuItem) => (
        <PartnerMenuEditMenuItem key={menuItem.id} menuItem={menuItem} />
      ))}
    </Stack>
  );
}

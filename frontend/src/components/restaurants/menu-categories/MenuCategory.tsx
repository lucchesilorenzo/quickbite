import { Stack, Typography } from "@mui/material";

import MenuItemRow from "./MenuItemRow";

import { RestaurantDetail } from "@/types";

type MenuCategoryProps = {
  menuCategory: RestaurantDetail["menu_categories"][number];
};

export default function MenuCategory({ menuCategory }: MenuCategoryProps) {
  return (
    <Stack spacing={2} sx={{ mb: 4 }} id={`category_${menuCategory.name}`}>
      <Typography component="h2" variant="h5" sx={{ fontWeight: 700 }}>
        {menuCategory.name}
      </Typography>

      <Stack spacing={2}>
        {menuCategory.menu_items.map((menuItem) => (
          <MenuItemRow key={menuItem.id} menuItem={menuItem} />
        ))}
      </Stack>
    </Stack>
  );
}

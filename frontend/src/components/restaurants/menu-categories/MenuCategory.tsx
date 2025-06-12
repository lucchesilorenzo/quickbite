import { Box, Stack, Typography, useMediaQuery } from "@mui/material";

import MenuItemRow from "./MenuItemRow";

import { RestaurantDetail } from "@/types";

type MenuCategoryProps = {
  menuCategory: RestaurantDetail["menu_categories"][number];
};

export default function MenuCategory({ menuCategory }: MenuCategoryProps) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Stack id={`category_${menuCategory.id}`} spacing={2} sx={{ mb: 4 }}>
      <Box sx={{ px: { xs: 2, lg: 0 } }}>
        <Typography
          component="h2"
          variant={isMobile ? "h6" : "h5"}
          sx={{ fontWeight: 700 }}
        >
          {menuCategory.name}
        </Typography>

        {menuCategory.description && (
          <Typography component="div" variant="body2" color="textSecondary">
            {menuCategory.description}
          </Typography>
        )}
      </Box>

      <Stack spacing={isMobile ? -1 : 2}>
        {menuCategory.menu_items.map((menuItem, index) => (
          <MenuItemRow
            key={menuItem.id}
            menuItem={menuItem}
            isLast={index === menuCategory.menu_items.length - 1}
          />
        ))}
      </Stack>
    </Stack>
  );
}

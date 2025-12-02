import { Box, Stack, Typography, useMediaQuery } from "@mui/material";

import MenuItemRow from "./MenuItemRow";

import { useMenu } from "@/contexts/MenuProvider";
import { Menu } from "@/types/menu.types";

type MenuCategoryItemProps = {
  menuCategory: Menu;
};

export default function MenuCategoryItem({
  menuCategory,
}: MenuCategoryItemProps) {
  const { registerMenuCategoryRef } = useMenu();

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Stack
      id={`category-${menuCategory.id}`}
      ref={(el) => registerMenuCategoryRef(menuCategory.id, el)}
      spacing={2}
      sx={{ mb: 4 }}
    >
      <Box sx={{ px: { xs: 2, lg: 0 } }}>
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Typography
            component="h2"
            variant={isMobile ? "h6" : "h5"}
            sx={{ fontWeight: 700 }}
          >
            {menuCategory.name}
          </Typography>

          <Typography component="p" variant="body2">
            {menuCategory.menu_items.length} items
          </Typography>
        </Stack>

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

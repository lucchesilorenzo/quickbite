import { Box } from "@mui/material";

import MenuCategory from "../menu-categories/MenuCategory";

import { useSingleRestaurant } from "@/hooks/contexts/useSingleRestaurant";

export default function MenuCategoriesListMobile() {
  const { restaurant } = useSingleRestaurant();

  return (
    <Box
      component="section"
      sx={{ display: { xs: "block", lg: "none" }, mt: 4 }}
    >
      {[...restaurant.menu_categories]
        .sort((a, b) => a.order - b.order)
        .map((menuCategory) => (
          <MenuCategory key={menuCategory.id} menuCategory={menuCategory} />
        ))}
    </Box>
  );
}

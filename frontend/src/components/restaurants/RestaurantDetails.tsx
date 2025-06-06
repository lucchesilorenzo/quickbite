import { Box } from "@mui/material";

import RestaurantCoverImage from "./RestaurantCoverImage";
import MenuCategoriesList from "./menu-categories/MenuCategoriesList";
import MenuCategoryNavigation from "./menu-category-navigation/MenuCategoryNavigation";
import RestaurantOverview from "./restaurant-overview/RestaurantOverview";

export default function RestaurantDetails() {
  return (
    <Box component="section">
      <RestaurantCoverImage />
      <RestaurantOverview />
      <MenuCategoryNavigation />
      <MenuCategoriesList />
    </Box>
  );
}

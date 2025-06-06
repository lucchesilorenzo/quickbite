import { Box } from "@mui/material";

import RestaurantCoverImage from "./RestaurantCoverImage";
import MenuCategoriesList from "./menu-categories/MenuCategoriesList";
import MenuCategoryNavigation from "./menu-category-navigation/MenuCategoryNavigation";
import RestaurantOverview from "./restaurant-overview/RestaurantOverview";

import { useSingleRestaurant } from "@/hooks/contexts/useSingleRestaurant";

export default function RestaurantDetails() {
  const { searchTerm } = useSingleRestaurant();

  return (
    <Box component="section">
      <RestaurantCoverImage />
      <RestaurantOverview />
      <MenuCategoryNavigation />
      {!searchTerm && <MenuCategoriesList />}
    </Box>
  );
}

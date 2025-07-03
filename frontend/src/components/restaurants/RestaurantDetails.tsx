import { Box } from "@mui/material";

import RestaurantCoverImage from "./RestaurantCoverImage";
import RestaurantInfo from "./RestaurantInfo";
import MenuCategoriesList from "./menu-categories/MenuCategoriesList";
import MenuCategoryNavigationSection from "./menu-category-navigation/MenuCategoryNavigationSection";
import RestaurantOverview from "./restaurant-overview/RestaurantOverview";

import { useSingleRestaurant } from "@/hooks/contexts/useSingleRestaurant";

export default function RestaurantDetails() {
  const { searchTerm } = useSingleRestaurant();

  return (
    <Box component="section">
      <RestaurantCoverImage />
      <RestaurantOverview />
      <MenuCategoryNavigationSection />
      {!searchTerm && <MenuCategoriesList />}
      <RestaurantInfo />
    </Box>
  );
}

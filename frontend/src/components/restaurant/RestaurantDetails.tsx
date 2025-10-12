import { Box } from "@mui/material";

import RestaurantCoverImage from "./RestaurantCoverImage";
import MenuCategoriesList from "./menu-categories/MenuCategoriesList";
import MenuCategoryNavigationSection from "./menu-category-navigation/MenuCategoryNavigationSection";
import RestaurantOverview from "./restaurant-overview/RestaurantOverview";

import { useRestaurant } from "@/contexts/public/RestaurantProvider";

export default function RestaurantDetails() {
  const { searchTerm } = useRestaurant();

  return (
    <Box component="section">
      <RestaurantCoverImage />
      <RestaurantOverview />
      <MenuCategoryNavigationSection />
      {!searchTerm && <MenuCategoriesList />}
    </Box>
  );
}

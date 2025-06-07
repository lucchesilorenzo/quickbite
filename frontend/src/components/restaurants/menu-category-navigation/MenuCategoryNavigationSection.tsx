import { Container } from "@mui/material";

import MenuCategoryNavigation from "./MenuCategoryNavigation";
import MenuCategoryNavigationSearch from "./MenuCategoryNavigationSearch";

import { useSingleRestaurant } from "@/hooks/contexts/useSingleRestaurant";

export default function MenuCategoryNavigationSection() {
  const { searchTerm } = useSingleRestaurant();

  return (
    <Container component="section" maxWidth="md">
      <MenuCategoryNavigationSearch />
      {!searchTerm && <MenuCategoryNavigation />}
    </Container>
  );
}

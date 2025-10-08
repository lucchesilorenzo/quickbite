import { useEffect } from "react";

import { Container } from "@mui/material";

import HeadingBlock from "@/components/partner/restaurant/common/HeadingBlock";
import AddMenuCategoryDialog from "@/components/partner/restaurant/menu/menu-categories/AddMenuCategoryDialog";
import MenuCategoriesList from "@/components/partner/restaurant/menu/menu-categories/MenuCategoriesList";

export default function PartnerRestaurantMenuCategoriesPage() {
  useEffect(() => {
    document.title = "Menu categories | QuickBite";
  }, []);

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 3 }}>
      <HeadingBlock title="Menu categories" backButton />
      <AddMenuCategoryDialog />
      <MenuCategoriesList />
    </Container>
  );
}

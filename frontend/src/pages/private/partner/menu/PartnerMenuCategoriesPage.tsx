import { useEffect } from "react";

import { Container } from "@mui/material";
import HeadingBlock from "@partner/components/HeadingBlock";
import AddMenuCategoryDialog from "@partner/restaurant/menu/menu-categories/AddMenuCategoryDialog";
import MenuCategoriesList from "@partner/restaurant/menu/menu-categories/MenuCategoriesList";

export default function PartnerMenuCategoriesPage() {
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

import { useEffect } from "react";

import { Container } from "@mui/material";
import AddMenuCategoryDialog from "@partner/restaurant/menu/menu-categories/AddMenuCategoryDialog";
import MenuCategoriesList from "@partner/restaurant/menu/menu-categories/MenuCategoriesList";

import HeadingBlock from "@/components/common/HeadingBlock";

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

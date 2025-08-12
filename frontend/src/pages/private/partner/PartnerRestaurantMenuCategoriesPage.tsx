import { useEffect } from "react";

import { Container } from "@mui/material";

import PartnerMenuCategoriesAddMenuCategoryDialog from "@/components/partner/restaurant/menu/menu-categories/PartnerMenuCategoriesAddMenuCategoryDialog";
import PartnerMenuCategoriesHeader from "@/components/partner/restaurant/menu/menu-categories/PartnerMenuCategoriesHeader";
import PartnerMenuCategoriesList from "@/components/partner/restaurant/menu/menu-categories/PartnerMenuCategoriesList";

export default function PartnerRestaurantMenuCategoriesPage() {
  useEffect(() => {
    document.title = "Menu categories | QuickBite";
  }, []);

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
      <PartnerMenuCategoriesHeader />
      <PartnerMenuCategoriesAddMenuCategoryDialog />
      <PartnerMenuCategoriesList />
    </Container>
  );
}

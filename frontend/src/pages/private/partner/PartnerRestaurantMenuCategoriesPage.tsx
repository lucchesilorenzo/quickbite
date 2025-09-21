import { useEffect } from "react";

import { Container } from "@mui/material";

import PartnerHeadingBlock from "@/components/partner/restaurant/common/PartnerHeadingBlock";
import PartnerMenuCategoriesAddMenuCategoryDialog from "@/components/partner/restaurant/menu/menu-categories/PartnerMenuCategoriesAddMenuCategoryDialog";
import PartnerMenuCategoriesList from "@/components/partner/restaurant/menu/menu-categories/PartnerMenuCategoriesList";

export default function PartnerRestaurantMenuCategoriesPage() {
  useEffect(() => {
    document.title = "Menu categories | QuickBite";
  }, []);

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 3 }}>
      <PartnerHeadingBlock title="Menu categories" backButton />
      <PartnerMenuCategoriesAddMenuCategoryDialog />
      <PartnerMenuCategoriesList />
    </Container>
  );
}

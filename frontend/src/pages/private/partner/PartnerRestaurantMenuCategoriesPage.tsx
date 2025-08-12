import { useEffect } from "react";

import { Container, Typography } from "@mui/material";

import PartnerBackButton from "@/components/partner/restaurant/common/PartnerBackButton";
import PartnerMenuCategoriesAddMenuCategoryDialog from "@/components/partner/restaurant/menu/menu-categories/PartnerMenuCategoriesAddMenuCategoryDialog";
import PartnerMenuCategoriesList from "@/components/partner/restaurant/menu/menu-categories/PartnerMenuCategoriesList";

export default function PartnerRestaurantMenuCategoriesPage() {
  useEffect(() => {
    document.title = "Menu categories | QuickBite";
  }, []);

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
      <PartnerBackButton />

      <Typography variant="h5" sx={{ fontWeight: 600, mt: 1, mb: 2 }}>
        Menu categories
      </Typography>

      <PartnerMenuCategoriesAddMenuCategoryDialog />
      <PartnerMenuCategoriesList />
    </Container>
  );
}

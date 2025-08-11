import { useEffect } from "react";

import { Container, Typography } from "@mui/material";

import PartnerMenuCategoriesAddMenuCategoryDialog from "@/components/partner/restaurant/menu/menu-categories/PartnerMenuCategoriesAddMenuCategoryDialog";

export default function PartnerRestaurantMenuCategoriesPage() {
  useEffect(() => {
    document.title = "Menu categories | QuickBite";
  }, []);

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 4 }}>
        Menu categories
      </Typography>

      <PartnerMenuCategoriesAddMenuCategoryDialog />
    </Container>
  );
}

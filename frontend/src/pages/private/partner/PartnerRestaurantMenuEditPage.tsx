import { useEffect } from "react";

import { Container } from "@mui/material";

import PartnerMenuEditNavigation from "@/components/common/menu-category-navigation/ShowMoreMenuCategoriesButton";
import PartnerMenuEditHeader from "@/components/partner/restaurant/menu/edit/PartnerMenuEditHeader";
import PartnerMenuEditMenuItemsList from "@/components/partner/restaurant/menu/edit/PartnerMenuEditMenuItemsList";
import PartnerRestaurantMenuProvider from "@/contexts/PartnerRestaurantMenuProvider";

export default function PartnerRestaurantMenuEditPage() {
  useEffect(() => {
    document.title = "Edit menu | QuickBite";
  }, []);

  return (
    <PartnerRestaurantMenuProvider>
      <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
        <PartnerMenuEditHeader />
        <PartnerMenuEditNavigation />
        <PartnerMenuEditMenuItemsList />
      </Container>
    </PartnerRestaurantMenuProvider>
  );
}

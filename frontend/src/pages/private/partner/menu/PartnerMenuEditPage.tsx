import { useEffect } from "react";

import { Container } from "@mui/material";

import PartnerRestaurantMenuProvider from "@/features/private/partner/contexts/PartnerMenuProvider";
import HeadingBlock from "@/features/private/partner/restaurant/common/HeadingBlock";
import MenuEditNavigation from "@/features/private/partner/restaurant/menu/edit/MenuEditNavigation";
import MenuItemsList from "@/features/private/partner/restaurant/menu/edit/MenuItemsList";

export default function PartnerMenuEditPage() {
  useEffect(() => {
    document.title = "Edit menu | QuickBite";
  }, []);

  return (
    <PartnerRestaurantMenuProvider>
      <Container component="main" maxWidth="md" sx={{ mt: 3 }}>
        <HeadingBlock
          title="Menu items"
          description="Review each menu category and manage your menu items: add new ones, edit existing items, or delete those you no longer need"
        />
        <MenuEditNavigation />
        <MenuItemsList />
      </Container>
    </PartnerRestaurantMenuProvider>
  );
}

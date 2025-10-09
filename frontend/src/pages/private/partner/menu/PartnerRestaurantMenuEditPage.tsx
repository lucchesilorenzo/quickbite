import { useEffect } from "react";

import { Container } from "@mui/material";

import HeadingBlock from "@/components/partner/restaurant/common/HeadingBlock";
import MenuEditNavigation from "@/components/partner/restaurant/menu/edit/MenuEditNavigation";
import MenuItemsList from "@/components/partner/restaurant/menu/edit/MenuItemsList";
import PartnerRestaurantMenuProvider from "@/contexts/private/partner/PartnerMenuProvider";

export default function PartnerRestaurantMenuEditPage() {
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

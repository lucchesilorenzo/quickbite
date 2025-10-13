import { useEffect } from "react";

import { Container } from "@mui/material";
import HeadingBlock from "@partner/components/HeadingBlock";
import RestaurantMenuProvider from "@partner/contexts/MenuProvider";
import MenuEditNavigation from "@partner/restaurant/menu/edit/MenuEditNavigation";
import MenuItemsList from "@partner/restaurant/menu/edit/MenuItemsList";

export default function PartnerMenuEditPage() {
  useEffect(() => {
    document.title = "Edit menu | QuickBite";
  }, []);

  return (
    <RestaurantMenuProvider>
      <Container component="main" maxWidth="md" sx={{ mt: 3 }}>
        <HeadingBlock
          title="Menu items"
          description="Review each menu category and manage your menu items: add new ones, edit existing items, or delete those you no longer need"
        />
        <MenuEditNavigation />
        <MenuItemsList />
      </Container>
    </RestaurantMenuProvider>
  );
}

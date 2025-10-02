import { useEffect } from "react";

import { Container } from "@mui/material";

import PartnerHeadingBlock from "@/components/partner/restaurant/common/PartnerHeadingBlock";
import PartnerMenuEditMenuItemsList from "@/components/partner/restaurant/menu/edit/PartnerMenuEditMenuItemsList";
import PartnerMenuEditNavigation from "@/components/partner/restaurant/menu/edit/PartnerMenuEditNavigation";
import PartnerRestaurantMenuProvider from "@/contexts/private/partner/PartnerRestaurantMenuProvider";

export default function PartnerRestaurantMenuEditPage() {
  useEffect(() => {
    document.title = "Edit menu | QuickBite";
  }, []);

  return (
    <PartnerRestaurantMenuProvider>
      <Container component="main" maxWidth="md" sx={{ mt: 3 }}>
        <PartnerHeadingBlock
          title="Menu items"
          description="Review each menu category and manage your menu items: add new ones, edit existing items, or delete those you no longer need"
        />
        <PartnerMenuEditNavigation />
        <PartnerMenuEditMenuItemsList />
      </Container>
    </PartnerRestaurantMenuProvider>
  );
}

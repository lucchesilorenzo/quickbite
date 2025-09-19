import { useEffect } from "react";

import { Container } from "@mui/material";

import PartnerHeadingBlock from "@/components/partner/restaurant/common/PartnerHeadingBlock";

export default function PartnerRestaurantNotificationsPage() {
  useEffect(() => {
    document.title = "Notifications | QuickBite";
  }, []);

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 3 }}>
      <PartnerHeadingBlock
        title="Notifications"
        description="View and manage your notifications"
      />
    </Container>
  );
}

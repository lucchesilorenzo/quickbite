import { useEffect } from "react";

import { Container } from "@mui/material";

export default function PartnerRestaurantNotificationsPage() {
  useEffect(() => {
    document.title = "Notifications | QuickBite";
  }, []);

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
      Notifications
    </Container>
  );
}

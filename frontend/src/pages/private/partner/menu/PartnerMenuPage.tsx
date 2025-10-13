import { useEffect } from "react";

import { Container } from "@mui/material";
import HeadingBlock from "@partner/components/HeadingBlock";
import MenuMainCards from "@partner/restaurant/menu/MenuMainCards";

export default function PartnerMenuPage() {
  useEffect(() => {
    document.title = "Menu | QuickBite";
  }, []);

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 3 }}>
      <HeadingBlock title="Menu" />
      <MenuMainCards />
    </Container>
  );
}

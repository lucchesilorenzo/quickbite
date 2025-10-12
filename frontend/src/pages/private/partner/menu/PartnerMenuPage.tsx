import { useEffect } from "react";

import { Container } from "@mui/material";

import HeadingBlock from "@/features/private/partner/restaurant/common/HeadingBlock";
import MenuMainCards from "@/features/private/partner/restaurant/menu/MenuMainCards";

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

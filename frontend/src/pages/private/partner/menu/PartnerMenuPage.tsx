import { useEffect } from "react";

import { Container } from "@mui/material";
import MenuMainCards from "@partner/restaurant/menu/MenuMainCards";

import HeadingBlock from "@/components/common/HeadingBlock";

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

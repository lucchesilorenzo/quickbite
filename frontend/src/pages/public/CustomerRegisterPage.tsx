import { useEffect } from "react";

import { Container } from "@mui/material";

import CustomerRegisterFormCard from "@/components/public/customers/CustomerRegisterFormCard";

export default function CustomerRegisterPage() {
  useEffect(() => {
    document.title = "Create account | QuickBite";
  }, []);

  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{ minHeight: "100%" }}
      disableGutters
    >
      <CustomerRegisterFormCard />
    </Container>
  );
}

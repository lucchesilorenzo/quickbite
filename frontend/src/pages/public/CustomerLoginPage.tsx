import { useEffect } from "react";

import { Container } from "@mui/material";

import CustomerLoginFormCard from "@/components/public/customers/login/CustomerLoginFormCard";

export default function CustomerLoginPage() {
  useEffect(() => {
    document.title = "Login | QuickBite";
  }, []);

  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{ minHeight: "100%" }}
      disableGutters
    >
      <CustomerLoginFormCard />
    </Container>
  );
}

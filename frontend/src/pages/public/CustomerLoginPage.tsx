import { useEffect } from "react";

import { Container } from "@mui/material";

import CustomerLoginFormCard from "@/components/customer/login/CustomerLoginFormCard";

export default function CustomerLoginPage() {
  useEffect(() => {
    document.title = "Login | QuickBite";
  }, []);

  return (
    <Container component="main" maxWidth="sm" disableGutters>
      <CustomerLoginFormCard />
    </Container>
  );
}

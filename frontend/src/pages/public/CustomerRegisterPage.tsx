import { useEffect } from "react";

import { Container } from "@mui/material";

import CustomerRegisterFormCard from "@/components/customer/register/CustomerRegisterFormCard";

export default function CustomerRegisterPage() {
  useEffect(() => {
    document.title = "Create account | QuickBite";
  }, []);

  return (
    <Container component="main" maxWidth="sm" disableGutters>
      <CustomerRegisterFormCard />
    </Container>
  );
}

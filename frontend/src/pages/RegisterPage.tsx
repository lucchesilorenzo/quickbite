import { useEffect } from "react";

import { Container } from "@mui/material";

import RegisterForm from "@/components/register/RegisterForm";

export default function RegisterPage() {
  useEffect(() => {
    document.title = "Create account | QuickBite";
  }, []);

  return (
    <Container component="main" maxWidth="md" sx={{ minHeight: "100vh" }}>
      <RegisterForm />
    </Container>
  );
}

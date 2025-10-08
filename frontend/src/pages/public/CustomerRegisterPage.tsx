import { useEffect } from "react";

import { Container } from "@mui/material";

import RegisterFormCardDesktop from "@/components/customer/register/RegisterFormCardDesktop";
import RegisterFormCardMobile from "@/components/customer/register/mobile/RegisterFormCardMobile";

export default function CustomerRegisterPage() {
  useEffect(() => {
    document.title = "Create account | QuickBite";
  }, []);

  return (
    <Container component="main" maxWidth="sm" disableGutters>
      <RegisterFormCardDesktop />
      <RegisterFormCardMobile />
    </Container>
  );
}

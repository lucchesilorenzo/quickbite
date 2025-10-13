import { useEffect } from "react";

import RegisterFormCardDesktop from "@customer/register/RegisterFormCardDesktop";
import RegisterFormCardMobile from "@customer/register/mobile/RegisterFormCardMobile";
import { Container } from "@mui/material";

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

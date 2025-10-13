import { useEffect } from "react";

import LoginFormCardDesktop from "@customer/login/LoginFormCardDesktop";
import LoginFormCardMobile from "@customer/login/mobile/LoginFormCardMobile";
import { Container } from "@mui/material";

export default function CustomerLoginPage() {
  useEffect(() => {
    document.title = "Login | QuickBite";
  }, []);

  return (
    <Container component="main" maxWidth="sm" disableGutters>
      <LoginFormCardDesktop />
      <LoginFormCardMobile />
    </Container>
  );
}

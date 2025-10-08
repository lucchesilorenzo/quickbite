import { useEffect } from "react";

import { Container } from "@mui/material";

import LoginFormCardDesktop from "@/components/customer/login/LoginFormCardDesktop";
import LoginFormCardMobile from "@/components/customer/login/mobile/LoginFormCardMobile";

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

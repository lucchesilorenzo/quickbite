import { useEffect } from "react";

import { Container } from "@mui/material";
import VerifyEmailCard from "@public/auth/verify-email/VerifyEmailCard";

export default function VerifyEmailPage() {
  useEffect(() => {
    document.title = "Verify email | QuickBite";
  }, []);

  return (
    <Container component="main" maxWidth="sm" disableGutters>
      <VerifyEmailCard />
    </Container>
  );
}

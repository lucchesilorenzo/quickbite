import { useEffect } from "react";

import { Container } from "@mui/material";
import ResetPasswordCard from "@public/auth/reset-password/ResetPasswordCard";
import { Navigate, useSearchParams } from "react-router-dom";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    document.title = "Reset password | QuickBite";
  }, []);

  if (!searchParams.get("token")) {
    return <Navigate to="/" replace />;
  }

  return (
    <Container component="main" maxWidth="sm" disableGutters>
      <ResetPasswordCard />
    </Container>
  );
}

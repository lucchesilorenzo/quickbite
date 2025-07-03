import { useEffect } from "react";

import { Container } from "@mui/material";

import TermsAndConditionsBreadcrumb from "@/components/terms-and-conditions/TermsAndConditionsBreadcrumb";

export default function TermsAndConditionsPage() {
  useEffect(() => {
    document.title = "Terms and conditions | QuickBite";
  }, []);

  return (
    <Container component="main" maxWidth="lg" disableGutters sx={{ p: 2 }}>
      <TermsAndConditionsBreadcrumb />
    </Container>
  );
}

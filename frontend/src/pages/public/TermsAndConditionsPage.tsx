import { useEffect } from "react";

import { Container } from "@mui/material";

import TermsAndConditionsBreadcrumb from "@/components/terms-and-conditions/TermsAndConditionsBreadcrumb";
import TermsAndConditionsTitleAndImportantLegalNotice from "@/components/terms-and-conditions/TermsAndConditionsTitleAndImportantLegalNotice";

export default function TermsAndConditionsPage() {
  useEffect(() => {
    document.title = "Terms & Conditions | QuickBite";
  }, []);

  return (
    <Container component="main" maxWidth="lg" disableGutters sx={{ p: 2 }}>
      <TermsAndConditionsBreadcrumb />
      <TermsAndConditionsTitleAndImportantLegalNotice />
    </Container>
  );
}

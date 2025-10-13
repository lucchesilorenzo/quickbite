import { useEffect } from "react";

import { Container } from "@mui/material";
import Breadcrumb from "@public/terms-and-conditions/Breadcrumb";
import SaveToPDFButton from "@public/terms-and-conditions/SaveToPDFButton";
import Terms from "@public/terms-and-conditions/Terms";
import TitleAndImportantLegalNotice from "@public/terms-and-conditions/TitleAndImportantLegalNotice";

export default function TermsAndConditionsPage() {
  useEffect(() => {
    document.title = "Terms & Conditions | QuickBite";
  }, []);

  return (
    <Container component="main" maxWidth="lg" disableGutters sx={{ p: 2 }}>
      <Breadcrumb />
      <TitleAndImportantLegalNotice />
      <Terms />
      <SaveToPDFButton />
    </Container>
  );
}

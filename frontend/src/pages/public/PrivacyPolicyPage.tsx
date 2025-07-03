import { useEffect } from "react";

import { Container } from "@mui/material";

import Breadcrumb from "@/components/privacy-policy/Breadcrumb";
import Paragraphs from "@/components/privacy-policy/Paragraphs";
import SaveToPDFButton from "@/components/privacy-policy/SaveToPDFButton";
import TitleAndEffectiveDate from "@/components/privacy-policy/TitleAndEffectiveDate";

export default function PrivacyPolicyPage() {
  useEffect(() => {
    document.title = "Privacy Policy | QuickBite";
  }, []);

  return (
    <Container component="main" maxWidth="lg" disableGutters sx={{ p: 2 }}>
      <Breadcrumb />
      <TitleAndEffectiveDate />
      <Paragraphs />
      <SaveToPDFButton />
    </Container>
  );
}

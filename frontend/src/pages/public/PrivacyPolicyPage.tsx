import { useEffect } from "react";

import { Container } from "@mui/material";

import Breadcrumb from "@/features/public/privacy-policy/Breadcrumb";
import Paragraphs from "@/features/public/privacy-policy/Paragraphs";
import SaveToPDFButton from "@/features/public/privacy-policy/SaveToPDFButton";
import TitleAndEffectiveDate from "@/features/public/privacy-policy/TitleAndEffectiveDate";

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

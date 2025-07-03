import { Button, Stack } from "@mui/material";
import { PDFDownloadLink } from "@react-pdf/renderer";

import TermsAndConditionsToPDF from "./TermsAndConditionsToPDF";

export default function SaveToPDFButton() {
  return (
    <Stack direction="row" sx={{ justifyContent: "center", mt: 2 }}>
      <PDFDownloadLink
        document={<TermsAndConditionsToPDF />}
        fileName="terms-and-conditions.pdf"
      >
        {({ loading, error }) => (
          <Button
            variant="contained"
            color={error ? "error" : "primary"}
            loading={loading}
            loadingIndicator="Saving..."
            size="large"
            sx={{ fontWeight: 700 }}
          >
            {error ? "There was an error saving your PDF" : "Save to PDF"}
          </Button>
        )}
      </PDFDownloadLink>
    </Stack>
  );
}

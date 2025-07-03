import { Box, Typography } from "@mui/material";

export default function TermsAndConditionsTitleAndImportantLegalNotice() {
  return (
    <Box>
      <Typography
        component="h2"
        variant="h6"
        sx={{ fontWeight: 700, textTransform: "uppercase", mt: 6 }}
      >
        QuickBite website terms and conditions
      </Typography>

      <Typography
        component="h3"
        variant="body1"
        sx={{ fontWeight: 700, textTransform: "uppercase", mt: 2 }}
      >
        Important legal notice
      </Typography>

      <Typography component="p" variant="body2" sx={{ mt: 2 }}>
        Welcome to QuickBite ("we", "our" or "us"). These Terms of Service
        ("Terms") govern your access to and use of our website, mobile
        application, and related services (collectively, the "Platform"). By
        using the Platform, you agree to these Terms.
      </Typography>
    </Box>
  );
}

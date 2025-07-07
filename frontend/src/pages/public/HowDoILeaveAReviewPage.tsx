import { useEffect } from "react";

import { Container, Typography, useMediaQuery } from "@mui/material";

import Sections from "@/how-do-i-leave-a-review/Sections";

export default function HowDoILeaveAReviewPage() {
  useEffect(() => {
    document.title = "How do I leave a review? | QuickBite";
  }, []);

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Container component="main" maxWidth="lg" disableGutters sx={{ p: 2 }}>
      <Typography
        component="h1"
        variant={isMobile ? "h5" : "h4"}
        sx={{ fontWeight: 700, mb: 5 }}
      >
        How do I leave a review?
      </Typography>

      <Sections />
    </Container>
  );
}

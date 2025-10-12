import { useEffect } from "react";

import { Container, Typography, useMediaQuery } from "@mui/material";

import RankingSections from "@/features/public/how-we-rank/RankingSections";

export default function HowWeRankPage() {
  useEffect(() => {
    document.title = "How we rank | QuickBite";
  }, []);

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Container component="main" maxWidth="lg" disableGutters sx={{ p: 2 }}>
      <Typography
        component="h1"
        variant={isMobile ? "h5" : "h4"}
        sx={{ fontWeight: 700, mb: 5 }}
      >
        How does QuickBite rank restaurants?
      </Typography>

      <RankingSections />
    </Container>
  );
}

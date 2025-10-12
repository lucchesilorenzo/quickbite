import { Box, Container, Stack } from "@mui/material";

import RegisterFormCard from "./RegisterFormCard";
import RegisterHeroBackground from "./RegisterHeroBackground";
import RegisterHeroTitle from "./RegisterHeroTitle";

export default function RegisterHero() {
  return (
    <Box sx={{ my: 6 }}>
      <RegisterHeroBackground />

      <Container
        component="main"
        maxWidth={false}
        sx={{ maxWidth: 1700, px: 2 }}
        disableGutters
      >
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <RegisterHeroTitle />
          <RegisterFormCard />
        </Stack>
      </Container>
    </Box>
  );
}

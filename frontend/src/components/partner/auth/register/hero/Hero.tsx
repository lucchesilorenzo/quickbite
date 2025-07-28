import { Box, Container, Stack } from "@mui/material";

import HeroBackground from "./HeroBackground";
import HeroTitle from "./HeroTitle";
import PartnerRegisterFormCard from "./PartnerRegisterFormCard";

export default function Hero() {
  return (
    <Box sx={{ my: 6 }}>
      <HeroBackground />

      <Container
        component="main"
        maxWidth={false}
        sx={{ maxWidth: 1700, px: 2 }}
        disableGutters
      >
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <HeroTitle />
          <PartnerRegisterFormCard />
        </Stack>
      </Container>
    </Box>
  );
}

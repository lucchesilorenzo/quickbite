import { Box, Container, Stack } from "@mui/material";

import PartnerRegisterFormCard from "./PartnerRegisterFormCard";
import PartnerRegisterHeroBackground from "./PartnerRegisterHeroBackground";
import PartnerRegisterHeroTitle from "./PartnerRegisterHeroTitle";

export default function PartnerRegisterHero() {
  return (
    <Box sx={{ my: 6 }}>
      <PartnerRegisterHeroBackground />

      <Container
        component="main"
        maxWidth={false}
        sx={{ maxWidth: 1700, px: 2 }}
        disableGutters
      >
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <PartnerRegisterHeroTitle />
          <PartnerRegisterFormCard />
        </Stack>
      </Container>
    </Box>
  );
}

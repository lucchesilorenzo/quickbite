import { Box } from "@mui/material";

export default function HeroBackground() {
  return (
    <Box
      component="img"
      src="/rider-register-hero.jpg"
      alt="Rider hero background"
      sx={{ width: 1, height: 200, objectFit: "cover" }}
    />
  );
}

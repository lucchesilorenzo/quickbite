import { Box } from "@mui/material";

export default function PartnerRegisterHeroBackground() {
  return (
    <Box
      component="img"
      src="/partner-hero.jpg"
      sx={{
        width: 1,
        position: "absolute",
        top: 0,
        zIndex: -10,
        height: 1000,
        objectFit: "contain",
        bgcolor: "#F3DF62",
      }}
    />
  );
}

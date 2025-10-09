import { Box } from "@mui/material";

export default function RegisterHeroBackground() {
  return (
    <Box
      component="img"
      src="/partner-hero.jpg"
      alt="Partner hero background"
      sx={{
        width: 1,
        objectFit: { xs: "cover", lg: "contain" },
        position: { xs: "relative", lg: "absolute" },
        top: { lg: 0 },
        height: { lg: 1000 },
        bgcolor: "#F3DF62",
        zIndex: { lg: -10 },
        pt: { xs: 8, lg: 0 },
        display: "block",
      }}
    />
  );
}

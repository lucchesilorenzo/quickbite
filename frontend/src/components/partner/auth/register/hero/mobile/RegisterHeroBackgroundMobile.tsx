import { Box } from "@mui/material";

export default function RegisterHeroBackgroundMobile() {
  return (
    <Box
      component="img"
      src="/partner-hero.jpg"
      sx={{
        pt: 10,
        width: 1,
        display: "block",
        objectFit: "contain",
        bgcolor: "#F3DF62",
      }}
    />
  );
}

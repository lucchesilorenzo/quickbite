import { Box, Typography } from "@mui/material";

export default function PartnerRegisterHeroTitleMobile() {
  return (
    <Box
      sx={{
        maxWidth: 400,
        position: "absolute",
        top: { xs: 40, sm: 60 },
        left: { xs: 16, sm: 24 },
      }}
    >
      <Typography
        component="h1"
        sx={{
          fontSize: { xs: "1.6rem", sm: "2rem", md: "2.4rem" },
          fontWeight: 400,
          lineHeight: 1.2,
        }}
      >
        The missing ingredient{" "}
        <Box component="span" sx={{ fontWeight: 700 }}>
          to your success
        </Box>
      </Typography>
    </Box>
  );
}

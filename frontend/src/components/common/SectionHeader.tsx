import { Box, Typography, useMediaQuery } from "@mui/material";

type SectionHeaderProps = {
  title: string;
  subtitle: string;
};

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <Box component="section" sx={{ textAlign: "center" }}>
      <Typography variant="h6" component="h3">
        {title}
      </Typography>

      <Typography
        variant={isMobile ? "h4" : "h3"}
        component="h2"
        color="primary"
        sx={{ fontWeight: "700" }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
}

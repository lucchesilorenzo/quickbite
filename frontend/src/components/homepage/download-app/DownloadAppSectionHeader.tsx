import { Typography, useMediaQuery } from "@mui/material";

export default function DownloadAppSectionHeader() {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <>
      <Typography
        variant={isMobile ? "h4" : "h3"}
        component="h3"
        sx={{ fontWeight: "700" }}
      >
        Download the app
      </Typography>

      <Typography variant={isMobile ? "h6" : "h5"} component="p">
        Click, sit back, and enjoy.
      </Typography>
    </>
  );
}

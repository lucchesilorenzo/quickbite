import { Box } from "@mui/material";

export default function DownloadAppImage() {
  return (
    <Box
      component="img"
      src="/download-app-content.jpg"
      alt="Download App"
      sx={{
        width: { xs: 180, md: 350 },
        objectFit: "contain",
        borderRadius: 2,
      }}
    />
  );
}

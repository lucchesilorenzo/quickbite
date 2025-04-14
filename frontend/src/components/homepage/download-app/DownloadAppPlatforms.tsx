import { Box, Stack, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";

import DownloadAppImage from "./DownloadAppImage";

export default function DownloadAppPlatforms() {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <Stack direction="row" spacing={4}>
      <Stack
        direction={isMobile ? "column" : "row"}
        spacing={isMobile ? 0 : 2}
        sx={{ alignItems: "center" }}
      >
        <Box component={Link} to="https://quickbite.com/ios" target="_blank">
          <Box
            component="img"
            src="/ios-download.png"
            alt="App Store"
            sx={{
              width: { xs: 120, md: 150 },
              objectFit: "contain",
            }}
          />
        </Box>

        <Box
          component={Link}
          to="https://quickbite.com/android"
          target="_blank"
        >
          <Box
            component="img"
            src="/android-download.png"
            alt="Google Play"
            sx={{
              width: { xs: 120, md: 160 },
              objectFit: "contain",
            }}
          />
        </Box>
      </Stack>

      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <DownloadAppImage />
      </Box>
    </Stack>
  );
}

import { Box, Stack } from "@mui/material";
import { blueGrey } from "@mui/material/colors";

import DownloadAppContent from "./DownloadAppContent";
import DownloadAppImage from "./DownloadAppImage";

export default function DownloadApp() {
  return (
    <Stack
      component="section"
      direction="row"
      sx={{
        px: 2,
        py: 4,
        justifyContent: "space-evenly",
        alignItems: { md: "center" },
        bgcolor: blueGrey[100],
      }}
    >
      <DownloadAppContent />

      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <DownloadAppImage />
      </Box>
    </Stack>
  );
}

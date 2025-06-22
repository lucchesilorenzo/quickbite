import { Stack } from "@mui/material";

import DownloadAppPlatforms from "./DownloadAppPlatforms";
import DownloadAppSectionHeader from "./DownloadAppSectionHeader";

export default function DownloadAppContent() {
  return (
    <Stack spacing={2}>
      <DownloadAppSectionHeader />
      <DownloadAppPlatforms />
    </Stack>
  );
}

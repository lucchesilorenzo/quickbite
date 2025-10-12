import { Stack } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export default function FullPageSpinner() {
  return (
    <Stack
      sx={{
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <CircularProgress color="primary" />
    </Stack>
  );
}

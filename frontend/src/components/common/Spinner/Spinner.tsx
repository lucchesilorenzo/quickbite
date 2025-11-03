import { CircularProgress, Stack } from "@mui/material";

export default function Spinner() {
  return (
    <Stack
      sx={{
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
      }}
    >
      <CircularProgress color="primary" />
    </Stack>
  );
}

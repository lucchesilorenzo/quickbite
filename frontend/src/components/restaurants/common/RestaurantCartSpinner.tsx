import { CircularProgress, Stack } from "@mui/material";

export default function RestaurantCartSpinner() {
  return (
    <Stack
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 1,
        height: 1,
        zIndex: 10,
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress color="primary" />
    </Stack>
  );
}

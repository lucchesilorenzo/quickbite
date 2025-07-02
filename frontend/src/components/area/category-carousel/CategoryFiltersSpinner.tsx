import { Stack } from "@mui/material";
import { CircularProgress } from "@mui/material";

export default function CategoryFiltersSpinner() {
  return (
    <Stack sx={{ alignItems: "center", justifyContent: "center" }}>
      <CircularProgress color="primary" size={24} />
    </Stack>
  );
}

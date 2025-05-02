import ErrorIcon from "@mui/icons-material/Error";
import { CircularProgress, Stack, Typography } from "@mui/material";

type NoRestaurantsOrLoadingProps = {
  type: "isLoading" | "noRestaurants";
};

export default function NoRestaurantsOrLoading({
  type,
}: NoRestaurantsOrLoadingProps) {
  if (type === "isLoading") {
    return (
      <Stack
        sx={{
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress />
      </Stack>
    );
  }

  return (
    <Stack
      sx={{
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
      }}
    >
      <Stack spacing={2} sx={{ alignItems: "center" }}>
        <ErrorIcon fontSize="large" color="error" />

        <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
          No restaurants found in this area
        </Typography>

        <Typography variant="body2" component="div" color="text.secondary">
          Try adjusting your filters or searching a different location.
        </Typography>
      </Stack>
    </Stack>
  );
}

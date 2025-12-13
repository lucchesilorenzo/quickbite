import { Skeleton, Stack } from "@mui/material";

export default function MenuEditNavigationSkeletons() {
  return (
    <Stack direction="row" spacing={4} sx={{ mt: 3 }}>
      <Stack direction="row" spacing={4}>
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} variant="rectangular" width={100} height={30} />
        ))}
      </Stack>

      <Stack direction="row" spacing={1}>
        {Array.from({ length: 2 }).map((_, index) => (
          <Skeleton key={index} variant="circular" width={30} height={30} />
        ))}
      </Stack>
    </Stack>
  );
}

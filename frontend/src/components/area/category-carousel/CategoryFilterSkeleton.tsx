import { Skeleton, Stack } from "@mui/material";

export default function CategoryFilterSkeleton() {
  return (
    <Stack direction="row" sx={{ alignItems: "center" }}>
      <Skeleton variant="rounded" width={120} height={80} animation="wave" />
    </Stack>
  );
}

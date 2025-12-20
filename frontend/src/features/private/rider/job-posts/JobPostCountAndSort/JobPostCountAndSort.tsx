import { Box, Link, Stack, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";

export default function JobPostCountAndSort() {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("sort_by");

  const isAsc = sortBy === "asc";
  const isDesc = sortBy === "desc";

  function handleSortChange(sortBy: "asc" | "desc") {
    if (searchParams.get("sort_by") === sortBy) return;

    setSearchParams((prev) => ({
      ...Object.fromEntries(prev),
      sort_by: sortBy,
    }));
  }

  return (
    <Box sx={{ mb: 2 }}>
      <Typography
        component="h1"
        variant="body2"
        color="textSecondary"
        sx={{ mb: 2 }}
      >
        Search results
      </Typography>

      <Stack
        direction="row"
        spacing={1}
        sx={{ alignItems: "center", justifyContent: "space-between" }}
      >
        <Stack direction="row" spacing={1}>
          <Typography variant="body2">Sort by:</Typography>

          <Link
            component={isDesc ? "span" : "button"}
            color={isDesc ? "inherit" : "info"}
            underline={isDesc ? "none" : "hover"}
            variant="body2"
            onClick={() => handleSortChange("desc")}
            sx={{
              textTransform: "lowercase",
              fontWeight: isDesc ? 500 : undefined,
            }}
          >
            Latest
          </Link>

          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ fontWeight: 500 }}
          >
            -
          </Typography>

          <Link
            component={isAsc ? "span" : "button"}
            color={isAsc ? "inherit" : "info"}
            underline={isAsc ? "none" : "hover"}
            variant="body2"
            onClick={() => handleSortChange("asc")}
            sx={{
              textTransform: "lowercase",
              fontWeight: isAsc ? 500 : undefined,
            }}
          >
            Oldest
          </Link>
        </Stack>

        <Box>
          <Typography variant="body2" color="textSecondary">
            4 job posts
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}
